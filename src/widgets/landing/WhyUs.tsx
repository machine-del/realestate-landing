import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";

const WhyGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;
	margin-top: 60px;

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const WhyNumber = styled.div`
	display: flex;
	width: 40px;
	height: 40px;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	border: 1px solid var(--gold-line);
	border-radius: 50%;
	background: var(--gold-soft);
	color: var(--gold);
	font-size: 14px;
	font-weight: 700;
`;

const WhyTitle = styled(UI.H3)`
	font-size: 18px;
	font-weight: 600;
	line-height: 1.4;
	letter-spacing: -0.01em;
`;

const WhyCard = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 20px;
	padding: 32px 28px;
	border: 1px solid var(--border);
	border-radius: var(--radius);
	transition: all 0.4s var(--ease);

	&:hover {
		transform: translateY(-4px);
		border-color: var(--gold-line);
		background: var(--bg-soft);
	}
`;

const reasons = [
	"Знаем рынок недвижимости",
	"Понимаем механику коротких видео",
	"Пишем сценарии под конкретного эксперта",
	"Фокусируемся не только на просмотрах, но и на бизнес-результате",
];

export function WhyUs() {
	return (
		<UI.Section>
			<UI.Container>
				<UI.Reveal as={UI.SectionLabel}>Почему мы</UI.Reveal>
				<UI.Reveal as={UI.SectionTitle}>
					Мы понимаем не только контент.<UI.Break />
					<UI.MutedText>Мы понимаем бизнес.</UI.MutedText>
				</UI.Reveal>
				<WhyGrid>
					{reasons.map((reason, index) => (
						<UI.Reveal as={WhyCard} key={reason}>
							<WhyNumber>{String(index + 1).padStart(2, "0")}</WhyNumber>
							<WhyTitle>{reason}</WhyTitle>
						</UI.Reveal>
					))}
				</WhyGrid>
			</UI.Container>
		</UI.Section>
	);
}
