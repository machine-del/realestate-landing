import { useId, useRef, useState } from "react";
import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";

const FAQList = styled.div`
	margin-top: 60px;
`;
const FAQItem = styled.div`
	border-bottom: 1px solid var(--border);

	&:first-of-type {
		border-top: 1px solid var(--border);
	}
`;
const FAQIcon = styled.span<{ $open: boolean }>`
	position: relative;
	display: flex;
	width: 32px;
	height: 32px;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	border: 1px solid ${({ $open }) => ($open ? "var(--gold)" : "var(--border-strong)")};
	border-radius: 50%;
	background: ${({ $open }) => ($open ? "var(--gold)" : "transparent")};
	color: ${({ $open }) => ($open ? "#0a0a0a" : "inherit")};
	transition: all 0.4s var(--ease);

	&::before,
	&::after {
		position: absolute;
		background: currentColor;
		content: "";
		transition: transform 0.4s var(--ease);
	}

	&::before {
		width: 12px;
		height: 1.5px;
	}

	&::after {
		width: 1.5px;
		height: 12px;
		transform: scaleY(${({ $open }) => ($open ? 0 : 1)});
	}
`;
const FAQQuestion = styled(UI.Button)`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	gap: 24px;
	padding: 28px 0;
	border: none;
	background: none;
	color: var(--text);
	font-family: inherit;
	font-size: clamp(16px, 2.2vw, 20px);
	font-weight: 600;
	letter-spacing: -0.01em;
	text-align: left;
	cursor: pointer;
	transition: color 0.3s;

	&:hover {
		color: var(--gold);
	}
`;
const FAQAnswer = styled.div<{ $open: boolean; $height: number }>`
	max-height: ${({ $open, $height }) => ($open ? `${$height}px` : "0px")};
	overflow: hidden;
	transition: max-height 0.5s var(--ease);
`;
const FAQAnswerText = styled.div`
	max-width: 90%;
	padding: 0 0 28px;
	color: var(--text-muted);
	font-size: 15px;
	font-weight: 300;
	line-height: 1.65;
`;

const questions = [
	[
		"Сколько Reels нужно выпускать в месяц?",
		"Оптимально — от 8 до 16 роликов в месяц. Точное количество зависит от ваших целей, ресурсов и ниши. Мы подбираем ритм, который можно поддерживать стабильно.",
	],
	[
		"Вы работаете только с риелторами?",
		"Мы специализируемся на рынке недвижимости: риелторы, агентства, эксперты по новостройкам, брокеры коммерческой недвижимости и владельцы небольших команд.",
	],
	[
		"Можно ли заказать только сценарии?",
		"Да. У нас есть отдельная услуга «Сценарии для Reels» — исследование тем, идеи, сценарии, hooks и адаптация под конкретного эксперта.",
	],
	[
		"Вы приезжаете на съёмки?",
		"Да, в рамках услуги «Контент под ключ» мы организуем съёмочный процесс и работаем с экспертом на площадке. Детали обсуждаем индивидуально.",
	],
	[
		"Что нужно от меня для начала работы?",
		"Минимум: желание развивать личный бренд и немного времени на съёмки. Всё остальное — анализ, стратегию, сценарии, монтаж — мы берём на себя.",
	],
	[
		"Через сколько можно увидеть результат?",
		"Первые изменения в охватах обычно видны через 4–8 недель системной работы. Сроки зависят от ниши, регулярности публикаций и вовлечённости эксперта.",
	],
];

function FAQEntry({
	question,
	answer,
	open,
	onToggle,
}: {
	question: string;
	answer: string;
	open: boolean;
	onToggle: () => void;
}) {
	const answerRef = useRef<HTMLDivElement>(null);
	const answerId = useId();

	return (
		<UI.Reveal as={FAQItem}>
			<FAQQuestion type="button" aria-expanded={open} aria-controls={answerId} onClick={onToggle}>
				{question}
				<FAQIcon $open={open} aria-hidden="true" />
			</FAQQuestion>
			<FAQAnswer id={answerId} $open={open} $height={answerRef.current?.scrollHeight ?? 0} aria-hidden={!open}>
				<FAQAnswerText ref={answerRef}>{answer}</FAQAnswerText>
			</FAQAnswer>
		</UI.Reveal>
	);
}

export function FAQ() {
	const [openQuestion, setOpenQuestion] = useState<string | null>(null);

	return (
		<UI.Section id="faq">
			<UI.Container>
				<UI.Reveal as={UI.SectionLabel}>FAQ</UI.Reveal>
				<UI.Reveal as={UI.SectionTitle}>Частые вопросы</UI.Reveal>
				<FAQList>
					{questions.map(([question, answer]) => (
						<FAQEntry
							key={question}
							question={question}
							answer={answer}
							open={openQuestion === question}
							onToggle={() => setOpenQuestion((current) => current === question ? null : question)}
						/>
					))}
				</FAQList>
			</UI.Container>
		</UI.Section>
	);
}
