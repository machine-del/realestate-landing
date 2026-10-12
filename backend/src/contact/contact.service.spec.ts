import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ContactService,
  type ContactRateLimitStore,
} from './contact.service.js';

describe('ContactService', () => {
  class TestContactService extends ContactService {
    constructor(
      private readonly setRateLimit: ContactRateLimitStore['set'],
    ) {
      super();
    }

    protected override createRateLimitStore(): ContactRateLimitStore {
      return { set: this.setRateLimit };
    }
  }

  const originalEnvironment = {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    TELEGRAM_CHAT_IDS: process.env.TELEGRAM_CHAT_IDS,
    VK_ACCESS_TOKEN: process.env.VK_ACCESS_TOKEN,
    VK_GROUP_ID: process.env.VK_GROUP_ID,
    VK_PEER_ID: process.env.VK_PEER_ID,
    VK_PEER_IDS: process.env.VK_PEER_IDS,
    VK_API_VERSION: process.env.VK_API_VERSION,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  };

  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = 'telegram-token';
    process.env.TELEGRAM_CHAT_IDS = 'telegram-chat-one, telegram-chat-two';
    process.env.VK_ACCESS_TOKEN = 'vk-token';
    process.env.VK_GROUP_ID = 'vk-group';
    process.env.VK_PEER_IDS = 'vk-peer-one, vk-peer-two';
    process.env.VK_API_VERSION = '5.199';
    process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.com';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'redis-token';
  });

  afterEach(() => {
    for (const [key, value] of Object.entries(originalEnvironment)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('sends the form details to both Telegram and VK', async () => {
    const redisSet = vi.fn<ContactRateLimitStore['set']>().mockResolvedValue('OK');
    const fetchMock = vi.fn((input: URL | RequestInfo) => {
      const url = String(input);
      const responseBody = url.includes('telegram') ? { ok: true } : { response: 123 };
      return Promise.resolve(
        new Response(JSON.stringify(responseBody), { status: 200 }),
      );
    });
    vi.stubGlobal('fetch', fetchMock);
    const service = new TestContactService(redisSet);

    await expect(
      service.submit({
        name: '  Pavel  ',
        contact: '@pavel',
        comment: '  Нужен сайт  ',
        personalDataConsent: true,
      }, '203.0.113.10'),
    ).resolves.toEqual({ message: 'Заявка отправлена.' });

    expect(redisSet).toHaveBeenCalledWith(
      expect.stringMatching(/^contact:rate-limit:[a-f0-9]{64}$/),
      '1',
      { nx: true, ex: 60 },
    );
    expect(fetchMock).toHaveBeenCalledTimes(4);

    const telegramRequests = fetchMock.mock.calls.filter(([url]) =>
      String(url).includes('telegram'),
    );
    expect(
      telegramRequests.map(([, options]) => JSON.parse(String(options?.body)).chat_id),
    ).toEqual(['telegram-chat-one', 'telegram-chat-two']);
    expect(JSON.parse(String(telegramRequests[0][1]?.body))).toEqual({
      chat_id: 'telegram-chat-one',
      text: 'Новая заявка с сайта\nИмя: Pavel\nКонтакт: @pavel\nКомментарий: Нужен сайт',
    });

    const vkRequest = fetchMock.mock.calls.find(([url]) =>
      String(url).includes('vk.com'),
    );
    const vkRequests = fetchMock.mock.calls.filter(([url]) =>
      String(url).includes('vk.com'),
    );
    expect(
      vkRequests.map(([, options]) =>
        new URLSearchParams(String(options?.body)).get('peer_id'),
      ),
    ).toEqual(['vk-peer-one', 'vk-peer-two']);
    expect(new URLSearchParams(String(vkRequest?.[1]?.body)).get('message')).toBe(
      'Новая заявка с сайта\nИмя: Pavel\nКонтакт: @pavel\nКомментарий: Нужен сайт',
    );
    expect(
      new URLSearchParams(String(vkRequest?.[1]?.body)).get('from_group'),
    ).toBe('vk-group');
  });

  it('rejects invalid form data without calling either bot', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const service = new ContactService();

    await expect(
      service.submit(
        { name: '', contact: '@pavel', personalDataConsent: true },
        '203.0.113.10',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('blocks a second submission from the same IP within the rate limit window', async () => {
    const redisSet = vi
      .fn<ContactRateLimitStore['set']>()
      .mockResolvedValueOnce('OK')
      .mockResolvedValueOnce(null);
    const fetchMock = vi.fn((input: URL | RequestInfo) => {
      const url = String(input);
      const responseBody = url.includes('telegram') ? { ok: true } : { response: 123 };
      return Promise.resolve(
        new Response(JSON.stringify(responseBody), { status: 200 }),
      );
    });
    vi.stubGlobal('fetch', fetchMock);
    const service = new TestContactService(redisSet);
    const submission = {
      name: 'Pavel',
      contact: '@pavel',
      personalDataConsent: true,
    };

    await service.submit(submission, '203.0.113.10');
    const error = await service
      .submit(submission, '203.0.113.10')
      .then(() => undefined, (reason: unknown) => reason);

    expect(error).toBeInstanceOf(HttpException);
    if (!(error instanceof HttpException)) {
      throw new Error('Expected a rate-limit HTTP exception.');
    }
    expect(error.getStatus()).toBe(HttpStatus.TOO_MANY_REQUESTS);
    expect(redisSet).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(
      fetchMock.mock.calls.filter(([url]) => String(url).includes('telegram')),
    ).toHaveLength(2);
    expect(
      fetchMock.mock.calls.filter(([url]) => String(url).includes('vk.com')),
    ).toHaveLength(2);
  });

  it('sends the submission without rate limiting when Redis is not configured', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    const fetchMock = vi.fn((input: URL | RequestInfo) =>
      Promise.resolve(
        new Response(
          JSON.stringify(
            String(input).includes('telegram') ? { ok: true } : { response: 123 },
          ),
          { status: 200 },
        ),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);
    const service = new ContactService();

    await expect(
      service.submit(
        { name: 'Pavel', contact: '@pavel', personalDataConsent: true },
        '203.0.113.10',
      ),
    ).resolves.toEqual({ message: 'Заявка отправлена.' });

    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it('reports partial delivery when one destination rejects the message', async () => {
    vi.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
    const redisSet = vi.fn<ContactRateLimitStore['set']>().mockResolvedValue('OK');
    let telegramCalls = 0;
    vi.stubGlobal(
      'fetch',
      vi.fn((input: URL | RequestInfo) =>
        Promise.resolve(
          String(input).includes('telegram')
            ? new Response(
                telegramCalls++ === 0 ? '{"ok":true}' : '{"ok":false}',
                { status: telegramCalls === 1 ? 200 : 401 },
              )
            : new Response('{"response":123}', { status: 200 }),
        ),
      ),
    );
    const service = new TestContactService(redisSet);

    await expect(
      service.submit(
        { name: 'Pavel', contact: '@pavel', personalDataConsent: true },
        '203.0.113.10',
      ),
    ).resolves.toEqual({ message: 'Заявка отправлена.' });
  });

  it('returns unavailable when every destination rejects the message', async () => {
    vi.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
    const redisSet = vi.fn<ContactRateLimitStore['set']>().mockResolvedValue('OK');
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve(new Response('{"error":"rejected"}', { status: 401 })),
      ),
    );
    const service = new TestContactService(redisSet);

    await expect(
      service.submit(
        { name: 'Pavel', contact: '@pavel', personalDataConsent: true },
        '203.0.113.10',
      ),
    ).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});
