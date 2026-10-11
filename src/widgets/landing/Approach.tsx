import { useState } from "react";
import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";

const Timeline = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1px;
	overflow: hidden;
	margin-top: 60px;
	border: 1px solid var(--border);
	border-radius: var(--radius);
	background: var(--border);
`;

const TimelineNum = styled.div<{ $active: boolean }>`
	color: var(--text-dim);
	font-size: clamp(32px, 5vw, 56px);
	font-weight: 800;
	line-height: 1;
	letter-spacing: -0.04em;
	color: ${({ $active }) => ($active ? "var(--gold)" : "var(--text-dim)")};
	transition: color 0.4s var(--ease);
`;

const TimelineItem = styled.div<{ $first: boolean }>`
	display: grid;
	grid-template-columns: 80px 1fr;
	align-items: start;
	gap: 24px;
	padding: 32px 28px;
	border-top: ${({ $first }) => ($first ? "1px solid var(--border)" : "none")};
	background: var(--bg);
	transition: background 0.4s var(--ease);

	&:hover,
	&:focus-within {
		background: var(--bg-soft);
	}

	@media (min-width: 768px) {
		grid-template-columns: 140px 1fr;
		padding: 40px 36px;
	}
`;

const TimelineBody = styled.div`
	display: flex;
	flex-direction: column;
`;

const TimelineTitle = styled(UI.H3)`
	margin-bottom: 8px;
	font-size: clamp(18px, 2.4vw, 24px);
	font-weight: 700;
	letter-spacing: -0.02em;
`;

const TimelineDescription = styled(UI.Paragraph)`
	color: var(--text-muted);
	font-size: 15px;
	font-weight: 300;
	line-height: 1.6;
`;

const items = [
	["Анализ", "Изучаем эксперта, аудиторию, рынок и конкурентов."],
	["Стратегия", "Определяем темы и форматы, которые способны привлекать внимание."],
	["Сценарии", "Создаём сценарии с сильным hook в первые секунды."],
	["Съёмка", "Организуем съёмочный процесс и помогаем раскрыть эксперта в кадре."],
	["Монтаж", "Делаем динамичный вертикальный монтаж под Reels, Shorts и TikTok."],
];

function TimelineEntry({
	title,
	description,
	index,
}: {
	title: string;
	description: string;
	index: number;
}) {
	const [active, setActive] = useState(false);

	return (
		<UI.Reveal>
			<TimelineItem
				$first={index === 0}
				onMouseEnter={() => setActive(true)}
				onMouseLeave={() => setActive(false)}
				onFocusCapture={() => setActive(true)}
				onBlurCapture={() => setActive(false)}
			>
				<TimelineNum $active={active}>{String(index + 1).padStart(2, "0")}</TimelineNum>
				<TimelineBody>
					<TimelineTitle>{title}</TimelineTitle>
					<TimelineDescription>{description}</TimelineDescription>
				</TimelineBody>
			</TimelineItem>
		</UI.Reveal>
	);
}

export function Approach() {
	return (
		<UI.Section id="approach">
			<UI.Container>
				<UI.Reveal as={UI.SectionLabel}>Подход</UI.Reveal>
				<UI.Reveal as={UI.SectionTitle}>
					Не просто снимаем Reels.<UI.Break />
					<UI.MutedText>Создаём контент-систему.</UI.MutedText>
				</UI.Reveal>
				<Timeline>
					{items.map(([title, description], index) => (
						<TimelineEntry
							key={title}
							title={title}
							description={description}
							index={index}
						/>
					))}
				</Timeline>
			</UI.Container>
		</UI.Section>
	);
}
