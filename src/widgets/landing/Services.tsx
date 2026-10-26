import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { createTelegramContactUrl } from "../../shared/telegram";

const ServicesGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 20px;
	margin-top: 60px;

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const ServiceTitle = styled(UI.H3)`
	margin-bottom: 20px;
	font-size: 22px;
	font-weight: 700;
	letter-spacing: -0.02em;
`;

const ServiceIcon = styled.div`
	display: flex;
	width: 44px;
	height: 44px;
	align-items: center;
	justify-content: center;
	margin-bottom: 24px;
	border: 1px solid var(--gold-line);
	border-radius: var(--radius-sm);
	background: var(--gold-soft);
	color: var(--gold);

`;
const ServiceIconSvg = styled(UI.Svg)`
	width: 22px;
	height: 22px;
	fill: none;
	stroke: currentColor;
	stroke-width: 1.5;
`;

const ServiceListItem = styled(UI.ListItem)`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px 0;
	border-bottom: 1px solid var(--border);
	color: var(--text-muted);
	font-size: 14px;

	&:last-child {
		border-bottom: none;
	}

	&::before {
		width: 5px;
		height: 5px;
		flex-shrink: 0;
		border-radius: 50%;
		background: var(--gold);
		content: "";
	}
`;

const ServiceList = styled(UI.UnorderedList)`
	flex-grow: 1;
	margin-bottom: 32px;
	list-style: none;
`;

const ServiceCard = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
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
`;
const ServiceSecondaryAction = styled(UI.OutlineLink)`
	width: 100%;
`;

const services = [
	{
		title: "Контент под ключ",
		items: ["Стратегия", "Сценарии", "Съёмка", "Монтаж", "Контент-план"],
		href: createTelegramContactUrl("Здравствуйте! Хочу обсудить проект по контенту под ключ."),
		label: "Обсудить проект",
		featured: true,
		icon: <><UI.Polygon points="23 7 16 12 23 17 23 7" /><UI.Rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></>,
	},
	{
		title: "Сценарии для Reels",
		items: ["Исследование тем", "Идеи", "Сценарии", "Hooks", "Адаптация под эксперта"],
		href: createTelegramContactUrl("Здравствуйте! Интересуют сценарии для Reels. Хочу обсудить задачу и узнать условия."),
		label: "Получить сценарии",
		icon: <><UI.Path d="M12 19l7-7 3 3-7 7-3-3z" /><UI.Path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><UI.Path d="M2 2l7.586 7.586" /><UI.Circle cx="11" cy="11" r="2" /></>,
	},
	{
		title: "Контент-система",
		items: ["Стратегия продвижения", "Контент-матрица", "Серии Reels", "Аналитика", "Масштабирование контента"],
		href: createTelegramContactUrl("Здравствуйте! Хочу обсудить контент-систему для моего проекта."),
		label: "Обсудить стратегию",
		icon: <><UI.Line x1="18" y1="20" x2="18" y2="10" /><UI.Line x1="12" y1="20" x2="12" y2="4" /><UI.Line x1="6" y1="20" x2="6" y2="14" /></>,
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
					{services.map(({ title, items, href, label, icon, featured }) => (
						<UI.Reveal as={ServiceCard} key={title}>
							<ServiceIcon><ServiceIconSvg viewBox="0 0 24 24">{icon}</ServiceIconSvg></ServiceIcon>
							<ServiceTitle>{title}</ServiceTitle>
							<ServiceList>{items.map((item) => <ServiceListItem key={item}>{item}</ServiceListItem>)}</ServiceList>
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
