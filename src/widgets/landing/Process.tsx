import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";

const ProcessList = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 60px;
`;

const ProcessNumber = styled.div`
	padding-top: 4px;
	color: var(--gold);
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.1em;
`;

const ProcessTitle = styled(UI.H3)`
	margin-bottom: 6px;
	font-size: clamp(18px, 2.5vw, 22px);
	font-weight: 700;
	letter-spacing: -0.02em;
`;

const ProcessDescription = styled(UI.Paragraph)`
	color: var(--text-muted);
	font-size: 15px;
	font-weight: 300;
`;

const ProcessBody = styled.div`
	display: flex;
	flex-direction: column;
`;

const ProcessItem = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr;
	align-items: start;
	gap: 20px;
	padding: 28px 0;
	border-bottom: 1px solid var(--border);
	transition: all 0.4s var(--ease);

	&:first-of-type {
		border-top: 1px solid var(--border);
	}

	&:hover {
		padding-left: 12px;
	}

	@media (min-width: 768px) {
		grid-template-columns: 120px 1fr;
		padding: 32px 0;
	}
`;

const steps = [
	["Знакомимся", "Вы рассказываете о себе, продукте и целях."],
	["Разбираем", "Изучаем аудиторию, рынок и позиционирование."],
	["Собираем систему", "Определяем форматы, темы и контент-стратегию."],
	["Запускаем", "Начинаем создавать и публиковать контент."],
	["Масштабируем", "Оставляем то, что работает, и усиливаем результат."],
];

export function Process() {
	return (
		<UI.Section>
			<UI.Container>
				<UI.Reveal as={UI.SectionLabel}>Процесс</UI.Reveal>
				<UI.Reveal as={UI.SectionTitle}>Как начинается работа</UI.Reveal>
				<ProcessList>
					{steps.map(([title, description], index) => (
						<UI.Reveal as={ProcessItem} key={title}>
							<ProcessNumber>{String(index + 1).padStart(2, "0")}</ProcessNumber>
							<ProcessBody>
								<ProcessTitle>{title}</ProcessTitle>
								<ProcessDescription>{description}</ProcessDescription>
							</ProcessBody>
						</UI.Reveal>
					))}
				</ProcessList>
			</UI.Container>
		</UI.Section>
	);
}
