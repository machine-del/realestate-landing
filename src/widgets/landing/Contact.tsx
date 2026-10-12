import { useEffect, useRef, useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";

const COOLDOWN_STORAGE_KEY = "contact-form-cooldown-until";
const SUBMITTED_STORAGE_KEY = "contact-form-submitted-until";
const COOLDOWN_DURATION_MS = 60_000;

function readStoredTimestamp(key: string) {
	try {
		const storedValue = Number(localStorage.getItem(key));
		return Number.isFinite(storedValue) && storedValue > Date.now() ? storedValue : 0;
	} catch {
		return 0;
	}
}

function readCooldownUntil() {
	return readStoredTimestamp(COOLDOWN_STORAGE_KEY);
}

function formatRemainingTime(milliseconds: number) {
	const totalSeconds = Math.ceil(milliseconds / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const ContactSection = styled(UI.Section)`
	padding: 48px 0 132px;
	background:
		radial-gradient(ellipse at 15% 30%, rgba(201, 169, 106, 0.08), transparent 42%),
		var(--bg);

	@media (min-width: 1024px) {
		padding: 140px 0;
	}
`;

const ContactLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 40px;
	align-items: start;

	@media (min-width: 900px) {
		grid-template-columns: minmax(0, 1fr) minmax(360px, 0.8fr);
		gap: 80px;
	}
`;

const ContactCopy = styled.div`
	order: 2;
	padding-top: 8px;

	@media (min-width: 900px) {
		order: 0;
		grid-column: 1;
	}
`;

const ContactEyebrow = styled.div`
	margin-bottom: 18px;
	color: var(--gold);
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.12em;
	text-transform: uppercase;
`;

const ContactTitle = styled(UI.H2)`
	max-width: 650px;
	margin-bottom: 20px;
	font-size: clamp(34px, 6vw, 64px);
	font-weight: 800;
	line-height: 1.03;
	letter-spacing: -0.045em;
`;

const ContactAccent = styled.span`
	color: var(--gold);
`;

const ContactDescription = styled(UI.Paragraph)`
	max-width: 540px;
	color: var(--text-muted);
	font-size: clamp(16px, 2vw, 19px);
	font-weight: 300;
	line-height: 1.65;
`;

const ContactForm = styled.form`
	order: 1;
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: clamp(22px, 4vw, 36px);
	border: 1px solid var(--border);
	border-radius: var(--radius);
	background: var(--bg-card);
	box-shadow: 0 24px 80px rgba(0, 0, 0, 0.2);

	@media (min-width: 900px) {
		order: 0;
		grid-column: 2;
	}
`;

const Field = styled.label`
	display: flex;
	flex-direction: column;
	gap: 8px;
	color: var(--text-muted);
	font-size: 13px;
	font-weight: 500;
`;

const FieldInput = styled.input`
	width: 100%;
	min-height: 48px;
	padding: 12px 14px;
	border: 1px solid var(--border-strong);
	border-radius: var(--radius-sm);
	outline: none;
	background: var(--bg);
	color: var(--text);
	font: inherit;
	font-size: 15px;
	transition: border-color 0.2s;

	&::placeholder {
		color: var(--text-dim);
	}

	&:focus {
		border-color: var(--gold);
	}
`;

const FieldTextarea = styled.textarea`
	width: 100%;
	min-height: 116px;
	resize: vertical;
	padding: 12px 14px;
	border: 1px solid var(--border-strong);
	border-radius: var(--radius-sm);
	outline: none;
	background: var(--bg);
	color: var(--text);
	font: inherit;
	font-size: 15px;
	line-height: 1.5;
	transition: border-color 0.2s;

	&::placeholder {
		color: var(--text-dim);
	}

	&:focus {
		border-color: var(--gold);
	}
`;

const SubmitButton = styled(UI.GoldButton)`
	width: 100%;
	min-height: 50px;
	margin-top: 4px;
`;

const FormNotice = styled(UI.Paragraph)`
	color: var(--text-dim);
	font-size: 12px;
	line-height: 1.6;
`;

const FormStatus = styled(UI.Paragraph)`
	color: var(--gold);
	font-size: 13px;
	line-height: 1.5;
`;

const ConsentField = styled.label`
	display: flex;
	align-items: flex-start;
	gap: 10px;
	color: var(--text-muted);
	font-size: 12px;
	line-height: 1.6;
`;

const ConsentCheckbox = styled.input`
	flex: 0 0 auto;
	width: 16px;
	height: 16px;
	margin: 2px 0 0;
	accent-color: var(--gold);
`;

const ConsentLink = styled.a`
	color: var(--gold);
	text-decoration: underline;
	text-underline-offset: 3px;
`;

export function Contact() {
	const [formStatus, setFormStatus] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [cooldownUntil, setCooldownUntil] = useState(readCooldownUntil);
	const [submittedUntil, setSubmittedUntil] = useState(() =>
		readStoredTimestamp(SUBMITTED_STORAGE_KEY),
	);
	const [currentTime, setCurrentTime] = useState(Date.now());
	const submittingRef = useRef(false);
	const remainingCooldown = Math.max(0, cooldownUntil - currentTime);
	const remainingSubmittedTime = Math.max(0, submittedUntil - currentTime);

	useEffect(() => {
		function syncCooldownFromStorage() {
			const storedCooldownUntil = readCooldownUntil();
			setCooldownUntil(storedCooldownUntil);
			setSubmittedUntil(readStoredTimestamp(SUBMITTED_STORAGE_KEY));
			setCurrentTime(Date.now());
		}

		if (remainingCooldown === 0 && remainingSubmittedTime === 0) {
			if (cooldownUntil > 0 || submittedUntil > 0) {
				setCooldownUntil(0);
				setSubmittedUntil(0);
				try {
					localStorage.removeItem(COOLDOWN_STORAGE_KEY);
					localStorage.removeItem(SUBMITTED_STORAGE_KEY);
				} catch {
					// Storage may be unavailable; the in-memory cooldown still expires normally.
				}
			}
		} else {
			const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000);
			window.addEventListener("storage", syncCooldownFromStorage);
			window.addEventListener("focus", syncCooldownFromStorage);
			return () => {
				window.clearInterval(timer);
				window.removeEventListener("storage", syncCooldownFromStorage);
				window.removeEventListener("focus", syncCooldownFromStorage);
			};
		}

		window.addEventListener("storage", syncCooldownFromStorage);
		window.addEventListener("focus", syncCooldownFromStorage);
		return () => {
			window.removeEventListener("storage", syncCooldownFromStorage);
			window.removeEventListener("focus", syncCooldownFromStorage);
		};
	}, [cooldownUntil, remainingCooldown, remainingSubmittedTime, submittedUntil]);

	function startCooldown() {
		const expiresAt = Date.now() + COOLDOWN_DURATION_MS;
		setCooldownUntil(expiresAt);
		setCurrentTime(Date.now());
		try {
			localStorage.setItem(COOLDOWN_STORAGE_KEY, String(expiresAt));
		} catch {
			// Storage may be unavailable; the in-memory cooldown still applies until reload.
		}
		return expiresAt;
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const storedCooldownUntil = readCooldownUntil();
		if (submittingRef.current || Date.now() < Math.max(cooldownUntil, storedCooldownUntil)) {
			setCooldownUntil(Math.max(cooldownUntil, storedCooldownUntil));
			setCurrentTime(Date.now());
			return;
		}

		submittingRef.current = true;
		setIsSubmitting(true);
		setFormStatus("");
		const expiresAt = startCooldown();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

		try {
			const response = await fetch(`${apiUrl}/contact`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: formData.get("name"),
					contact: formData.get("contact"),
					comment: formData.get("comment"),
					personalDataConsent: formData.get("personalDataConsent") === "on",
				}),
			});

			if (!response.ok) {
				const result: unknown = await response.json().catch(() => null);
				const serverMessage =
					typeof result === "object" &&
					result !== null &&
					"message" in result &&
					typeof result.message === "string"
						? result.message
						: "";
				setFormStatus(
					response.status === 429
						? serverMessage || "Заявку можно отправлять не чаще одного раза в минуту."
						: serverMessage || "Не удалось отправить заявку. Попробуйте ещё раз позже.",
				);
				return;
			}

			const result: unknown = await response.json().catch(() => null);
			const serverMessage =
				typeof result === "object" &&
				result !== null &&
				"message" in result &&
				typeof result.message === "string"
					? result.message
					: "Заявка отправлена.";
			setSubmittedUntil(expiresAt);
			try {
				localStorage.setItem(SUBMITTED_STORAGE_KEY, String(expiresAt));
			} catch {
				// Storage may be unavailable; the submitted state remains until the page reloads.
			}
			form.reset();
			setFormStatus(serverMessage);
		} catch {
			setFormStatus(
				"Не удалось связаться с сервером. Повторная отправка будет доступна через минуту.",
			);
		} finally {
			submittingRef.current = false;
			setIsSubmitting(false);
		}
	}

	return (
		<ContactSection id="contact">
			<UI.Container>
				<ContactLayout>
					<ContactCopy>
						<ContactEyebrow>Обсудим ваш проект</ContactEyebrow>
						<ContactTitle>
							Готовы сделать ваш контент <ContactAccent>заметным?</ContactAccent>
						</ContactTitle>
						<ContactDescription>
							Расскажите о своей задаче. Оставьте имя и удобный контакт — обсудим подходящий формат
							работы и следующие шаги.
						</ContactDescription>
					</ContactCopy>
					<ContactForm onSubmit={handleSubmit}>
						<Field>
							Имя
							<FieldInput name="name" type="text" autoComplete="name" placeholder="Как к вам обращаться" required />
						</Field>
						<Field>
							Telegram username или телефон
							<FieldInput
								name="contact"
								type="text"
								autoComplete="tel"
								placeholder="@username или +7..."
								required
							/>
						</Field>
						<Field>
							Комментарий
							<FieldTextarea name="comment" placeholder="Коротко расскажите о проекте и задаче" rows={4} />
						</Field>
						<ConsentField>
							<ConsentCheckbox name="personalDataConsent" type="checkbox" required />
							<span>
								Согласен на обработку персональных данных в соответствии с{" "}
								<ConsentLink href="/privacy" target="_blank" rel="noopener noreferrer">
									Политикой обработки персональных данных
								</ConsentLink>
								.
							</span>
						</ConsentField>
						{remainingSubmittedTime === 0 && (
							<SubmitButton
								type="submit"
								disabled={isSubmitting || remainingCooldown > 0}
							>
								{isSubmitting
									? "Отправляем..."
									: remainingCooldown > 0
										? `Повторно через ${formatRemainingTime(remainingCooldown)}`
										: "Обсудить проект"}
							</SubmitButton>
						)}
						<FormNotice>
							Доступ к Telegram может быть ограничен. Укажите телефон или другой удобный способ связи.
						</FormNotice>
						{formStatus && <FormStatus role="status">{formStatus}</FormStatus>}
					</ContactForm>
				</ContactLayout>
			</UI.Container>
		</ContactSection>
	);
}
