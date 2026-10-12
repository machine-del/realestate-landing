import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { randomInt, createHash } from 'node:crypto';
import { Redis } from '@upstash/redis';

export interface ContactSubmission {
  name: string;
  contact: string;
  comment: string;
  personalDataConsent: true;
}

export interface ContactRateLimitStore {
  set(
    key: string,
    value: string,
    options: { nx: true; ex: number },
  ): Promise<string | null>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseSubmission(value: unknown): ContactSubmission {
  if (!isRecord(value)) {
    throw new BadRequestException('Ожидался JSON с данными формы.');
  }

  const { name, contact, comment = '', personalDataConsent } = value;
  if (
    typeof name !== 'string' ||
    typeof contact !== 'string' ||
    typeof comment !== 'string' ||
    personalDataConsent !== true
  ) {
    throw new BadRequestException(
      'Заполните поля формы и подтвердите согласие на обработку персональных данных.',
    );
  }

  const submission = {
    name: name.trim(),
    contact: contact.trim(),
    comment: comment.trim(),
    personalDataConsent: true as const,
  };

  if (
    !submission.name ||
    submission.name.length > 100 ||
    !submission.contact ||
    submission.contact.length > 200 ||
    submission.comment.length > 2000
  ) {
    throw new BadRequestException('Проверьте заполнение полей формы.');
  }

  return submission;
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private redisClient?: ContactRateLimitStore;

  async submit(body: unknown, ipAddress: string) {
    const submission = parseSubmission(body);
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatIds = [
      ...new Set(
        (process.env.TELEGRAM_CHAT_IDS ?? process.env.TELEGRAM_CHAT_ID ?? '')
          .split(',')
          .map((chatId) => chatId.trim())
          .filter(Boolean),
      ),
    ];
    const vkToken = process.env.VK_ACCESS_TOKEN;
    const vkGroupId = process.env.VK_GROUP_ID;
    const vkPeerIds = [
      ...new Set(
        (process.env.VK_PEER_IDS ?? process.env.VK_PEER_ID ?? '')
          .split(',')
          .map((peerId) => peerId.trim())
          .filter(Boolean),
      ),
    ];
    const vkApiVersion = process.env.VK_API_VERSION ?? '5.199';

    const missingSettings = [
      ['TELEGRAM_BOT_TOKEN', telegramToken],
      ['TELEGRAM_CHAT_IDS', telegramChatIds.length > 0 ? 'configured' : undefined],
      ['VK_ACCESS_TOKEN', vkToken],
      ['VK_GROUP_ID', vkGroupId],
      ['VK_PEER_IDS', vkPeerIds.length > 0 ? 'configured' : undefined],
    ]
      .filter(([, value]) => !value)
      .map(([name]) => name);

    if (missingSettings.length > 0) {
      this.logger.error(`Contact delivery is not configured: ${missingSettings.join(', ')}`);
      throw new ServiceUnavailableException('Отправка формы пока не настроена.');
    }
    if (!telegramToken || telegramChatIds.length === 0 || !vkToken || !vkGroupId || vkPeerIds.length === 0) {
      throw new ServiceUnavailableException('Отправка формы пока не настроена.');
    }
    await this.reserveRateLimit(ipAddress);

    const message = [
      'Новая заявка с сайта',
      `Имя: ${submission.name}`,
      `Контакт: ${submission.contact}`,
      `Комментарий: ${submission.comment || 'не указан'}`,
    ].join('\n');

    const deliveries = [
      ...telegramChatIds.map((chatId) => ({
        channel: 'Telegram',
        send: () => this.sendToTelegram(telegramToken, chatId, message),
      })),
      ...vkPeerIds.map((peerId) => ({
        channel: 'VK',
        send: () => this.sendToVk(vkToken, vkGroupId, peerId, vkApiVersion, message),
      })),
    ];
    const results = await Promise.allSettled(deliveries.map(({ send }) => send()));
    const failedChannels = results.flatMap((result, index) => {
      if (result.status !== 'rejected') return [];
      const reason =
        result.reason instanceof Error ? `: ${result.reason.message}` : '';
      return [`${deliveries[index].channel}${reason}`];
    },
    );
    const successfulDeliveries = results.length - failedChannels.length;

    if (successfulDeliveries === 0) {
      this.logger.error(`Contact delivery failed for all destinations: ${failedChannels.join(', ')}`);
      throw new ServiceUnavailableException(
        'Не удалось отправить заявку. Попробуйте позже.',
      );
    }

    if (failedChannels.length > 0) {
      this.logger.error(`Contact delivery partially failed for ${failedChannels.join(', ')}`);
    }

    return { message: 'Заявка отправлена.' };
  }

  private async reserveRateLimit(ipAddress: string) {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!redisUrl || !redisToken) {
      this.logger.warn('Contact rate limiting is disabled because Redis is not configured.');
      return;
    }

    if (!ipAddress) {
      throw new ServiceUnavailableException('Не удалось определить адрес отправителя.');
    }

    const redisClient = this.redisClient ??= this.createRateLimitStore(
      redisUrl,
      redisToken,
    );
    const ipHash = createHash('sha256').update(ipAddress).digest('hex');

    let result: string | null;
    try {
      result = await redisClient.set(
        `contact:rate-limit:${ipHash}`,
        '1',
        { nx: true, ex: 60 },
      );
    } catch {
      this.logger.error('Contact rate limit storage request failed.');
      throw new ServiceUnavailableException(
        'Не удалось проверить ограничение отправки. Попробуйте позже.',
      );
    }

    if (result !== 'OK') {
      throw new HttpException(
        'Заявку можно отправлять не чаще одного раза в минуту.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  protected createRateLimitStore(
    url: string,
    token: string,
  ): ContactRateLimitStore {
    return new Redis({ url, token });
  }

  private async sendToTelegram(token: string, chatId: string, text: string) {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(10_000),
    });
    const result: unknown = await response.json();

    if (!response.ok || !isRecord(result) || result.ok !== true) {
      throw new Error('Telegram rejected the message.');
    }
  }

  private async sendToVk(
    accessToken: string,
    groupId: string,
    peerId: string,
    apiVersion: string,
    message: string,
  ) {
    const body = new URLSearchParams({
      peer_id: peerId,
      from_group: groupId,
      random_id: String(randomInt(0, 2_147_483_647)),
      message,
      access_token: accessToken,
      v: apiVersion,
    });
    const response = await fetch('https://api.vk.com/method/messages.send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    const result: unknown = await response.json();

    if (!response.ok || !isRecord(result)) {
      throw new Error(`VK returned HTTP ${response.status}.`);
    }
    if ('error' in result) {
      const error = result.error;
      if (isRecord(error)) {
        const code =
          typeof error.error_code === 'number' ? ` ${error.error_code}` : '';
        const message =
          typeof error.error_msg === 'string' ? `: ${error.error_msg}` : '';
        throw new Error(`VK API error${code}${message}`);
      }
      throw new Error('VK returned an API error.');
    }
    if (!('response' in result)) {
      throw new Error('VK returned an unexpected response.');
    }
  }
}
