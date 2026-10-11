import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";

const ProblemGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;
	margin-top: 60px;

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const ProblemNumber = styled.div`
	margin-bottom: 16px;
	color: var(--gold);
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.1em;
`;

const ProblemText = styled.div`
	font-size: clamp(16px, 2vw, 19px);
	font-weight: 500;
	line-height: 1.4;
	letter-spacing: -0.01em;
`;

const ProblemCard = styled.div`
	position: relative;
	overflow: hidden;
	padding: 32px 28px;
	border: 1px solid var(--border);
	border-radius: var(--radius);
	background: var(--bg-card);
	transition: all 0.4s var(--ease);

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		transform: scaleX(0);
		transform-origin: left;
		background: linear-gradient(90deg, var(--gold), transparent);
		content: "";
		transition: transform 0.5s var(--ease);
	}

	&:hover {
		transform: translateY(-4px);
		border-color: var(--gold-line);

		&::before {
			transform: scaleX(1);
		}
	}
`;

const problems = [
	"Снимают то, что интересно им, а не аудитории",
	"Начинают видео без сильного первого кадра",
	"Говорят слишком много и слишком долго",
	"Публикуют хаотично, без контент-системы",
];

export function Problem() {
	return (
		<UI.Section>
			<UI.Container>
				<UI.Reveal as={UI.SectionLabel}>Проблема</UI.Reveal>
				<UI.Reveal as={UI.SectionTitle}>
					Почему большинство риелторов снимают контент,{" "}
					<UI.MutedText>который никто не смотрит?</UI.MutedText>
				</UI.Reveal>
				<ProblemGrid>
					{problems.map((problem, index) => (
						<UI.Reveal as={ProblemCard} key={problem}>
							<ProblemNumber>{String(index + 1).padStart(2, "0")}</ProblemNumber>
							<ProblemText>{problem}</ProblemText>
						</UI.Reveal>
					))}
				</ProblemGrid>
			</UI.Container>
		</UI.Section>
	);
}
