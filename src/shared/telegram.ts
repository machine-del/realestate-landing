const TELEGRAM_MESSAGE = "Здравствуйте! Хочу обсудить проект по контенту для недвижимости.";

export function createTelegramContactUrl(message = TELEGRAM_MESSAGE) {
	return `https://t.me/menportal_g?text=${encodeURIComponent(message)}`;
}

export const TELEGRAM_CONTACT_URL = createTelegramContactUrl();
