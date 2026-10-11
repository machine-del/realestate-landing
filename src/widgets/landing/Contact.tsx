import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";

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

export function Contact() {
	const [formStatus, setFormStatus] = useState("");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setFormStatus("Форма пока не подключена к отправке. Данные не отправлены.");
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
						<SubmitButton type="submit">Обсудить проект</SubmitButton>
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
