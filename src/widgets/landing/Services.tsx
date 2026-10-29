import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { createTelegramContactUrl } from "../../shared/telegram";

const ServicesGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	align-items: stretch;
	gap: 20px;
	margin-top: 60px;

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const ServiceTitle = styled(UI.H3)`
	margin-bottom: 12px;
	font-size: 22px;
	font-weight: 700;
	letter-spacing: -0.02em;
`;

const Audience = styled.div`
	margin: 0 0 16px;
	color: var(--gold);
	font-size: 16px;
	font-weight: 600;
	line-height: 1.4;
`;

const ServiceDescription = styled.p`
	margin: 0 0 28px;
	color: var(--text-muted);
	font-size: 15px;
	line-height: 1.6;
`;

const ServiceContent = styled.div`
	margin-bottom: auto;
`;

const ServiceCard = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
	box-sizing: border-box;
	padding: 36px 28px;
	border: 1px solid var(--border);
	border-radius: var(--radius);
	background: var(--bg-card);
	transition: all 0.4s var(--ease);

	&:hover {
		transform: translateY(-6px);
		border-color: var(--gold-line);
		box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
	}

	&:first-of-type {
		border-color: var(--gold-line);
		background: linear-gradient(180deg, rgba(201, 169, 106, 0.08) 0%, var(--bg-card) 60%);
	}

`;
const ServicePrimaryAction = styled(UI.GoldLink)`
	width: 100%;
	margin-top: 20px;
`;
const ServiceSecondaryAction = styled(UI.OutlineLink)`
	width: 100%;
	margin-top: 20px;
`;

const services = [
	{
		title: "Экспертный блог с нуля",
		description: "Даже если у вас нет своего экспертного блога, мы запустим его с самого нуля.",
		audience: "0 подписчиков",
		href: createTelegramContactUrl("Здравствуйте! Хочу обсудить проект «Экспертный блог с нуля»."),
		label: "Обсудить проект",
		featured: true,
	},
	{
		title: "Блог без системы",
		description: "Ваш блог пока не определился со своим направлением и находится между личным и экспертным.",
		audience: "От 500 до 3 000 подписчиков",
		href: createTelegramContactUrl("Здравствуйте! Хочу обсудить проект «Блог без системы»."),
		label: "Обсудить проект",
	},
	{
		title: "Новый уровень",
		description: "Выходим за рамки привычных сценариев и ищем новые способы масштабировать охваты, аудиторию и количество обращений.",
		audience: "10 000+ подписчиков",
		href: createTelegramContactUrl("Здравствуйте! Хочу обсудить проект «Новый уровень»."),
		label: "Обсудить проект",
	},
];

export function Services() {
	return (
		<UI.Section id="services">
			<UI.Container>
				<UI.Reveal as={UI.SectionLabel}>Услуги</UI.Reveal>
				<UI.Reveal as={UI.SectionTitle}>
					Что мы можем сделать <UI.MutedText>для вашего проекта</UI.MutedText>
				</UI.Reveal>
				<ServicesGrid>
					{services.map(({ title, description, audience, href, label, featured }) => (
						<UI.Reveal as={ServiceCard} key={title}>
							<ServiceContent>
								<ServiceTitle>{title}</ServiceTitle>
								<Audience>{audience}</Audience>
								<ServiceDescription>{description}</ServiceDescription>
							</ServiceContent>
							{featured
								? <ServicePrimaryAction href={href} target="_blank" rel="noopener noreferrer">{label}</ServicePrimaryAction>
								: <ServiceSecondaryAction href={href} target="_blank" rel="noopener noreferrer">{label}</ServiceSecondaryAction>}
						</UI.Reveal>
					))}
				</ServicesGrid>
			</UI.Container>
		</UI.Section>
	);
}
