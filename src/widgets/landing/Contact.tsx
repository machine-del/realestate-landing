import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { TELEGRAM_CONTACT_URL } from "../../shared/telegram";

const ContactSection = styled(UI.Section)`
	padding: 112px 0 96px;

	@media (min-width: 1024px) {
		padding: 140px 0 120px;
	}
`;

const ContactPanel = styled.div`
	position: relative;
	isolation: isolate;
	display: grid;
	grid-template-columns: 1fr;
	gap: 36px;
	overflow: hidden;
	padding: clamp(30px, 7vw, 76px);
	border: 1px solid rgba(201, 169, 106, 0.2);
	border-radius: 24px;
	background: linear-gradient(115deg, #15140f 0%, #111 52%, #101010 100%);
	box-shadow: 0 30px 100px rgba(0, 0, 0, 0.24);

	&::before {
		position: absolute;
		z-index: -1;
		top: 50%;
		right: -100px;
		width: min(56vw, 600px);
		min-width: 340px;
		aspect-ratio: 1;
		transform: translateY(-50%);
		border-radius: 50%;
		background: radial-gradient(circle, rgba(201, 169, 106, 0.2) 0%, rgba(201, 169, 106, 0.07) 38%, transparent 72%);
		content: "";
		pointer-events: none;
	}

	@media (min-width: 900px) {
		grid-template-columns: minmax(0, 1fr) 260px;
		gap: 64px;
		align-items: center;
	}
`;

const ContactEyebrow = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 18px;
	color: var(--gold);
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.12em;
	text-transform: uppercase;
`;

const ContactTitle = styled(UI.H2)`
	max-width: 720px;
	margin-bottom: 20px;
	font-size: clamp(36px, 5.8vw, 68px);
	font-weight: 800;
	line-height: 1.03;
	letter-spacing: -0.045em;
`;

const ContactAccent = styled.span`
	color: var(--gold);
`;

const ContactDescription = styled(UI.Paragraph)`
	max-width: 560px;
	color: var(--text-muted);
	font-size: clamp(16px, 2vw, 19px);
	font-weight: 300;
	line-height: 1.65;
`;

const ContactActions = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16px;
`;

const ContactAction = styled(UI.LargeGoldLink)`
	width: 100%;
	padding-right: 22px;
	padding-left: 22px;
`;

export function Contact() {
	return (
		<ContactSection id="contact">
			<UI.Container>
				<ContactPanel>
					<div>
						<ContactEyebrow>Давайте обсудим ваш проект</ContactEyebrow>
						<ContactTitle>
							Соберём систему контента <ContactAccent>для вашего бизнеса.</ContactAccent>
						</ContactTitle>
						<ContactDescription>
							Расскажите о задачах в недвижимости, и мы подберём формат работы для вашего проекта.
						</ContactDescription>
					</div>
					<ContactActions>
						<ContactAction href={TELEGRAM_CONTACT_URL} target="_blank" rel="noopener noreferrer">
							Написать в Telegram
						</ContactAction>
					</ContactActions>
				</ContactPanel>
			</UI.Container>
		</ContactSection>
	);
}
