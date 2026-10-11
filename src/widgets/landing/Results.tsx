import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";

const Section = styled.section`
	position: relative;
	padding: 100px 0;
	@media (min-width: 1024px) {
		padding: 140px 0;
	}
`;

const Container = styled.div`
	width: 100%;
	max-width: 1240px;
	margin: 0 auto;
	padding: 0 24px;
	@media (min-width: 768px) {
		padding: 0 40px;
	}
	@media (min-width: 1280px) {
		padding: 0 60px;
	}
`;

const Label = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 24px;
	color: var(--gold);
	font-size: 12px;
	font-weight: 500;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	&::before {
		width: 24px;
		height: 1px;
		background: var(--gold);
		content: "";
	}
`;

const Title = styled.h2`
	max-width: 900px;
	margin: 0 0 20px;
	font-size: clamp(28px, 4.5vw, 52px);
	font-weight: 800;
	line-height: 1.1;
	letter-spacing: -0.03em;
`;

const Muted = styled.span`
	color: var(--text-dim);
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1px;
	overflow: hidden;
	margin-top: 60px;
	border: 1px solid var(--border);
	border-radius: var(--radius);
	background: var(--border);
	@media (min-width: 768px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

const Item = styled.div`
	padding: 36px 24px;
	background: var(--bg);
	transition: background 0.4s var(--ease);
	&:hover {
		background: var(--bg-soft);
	}
`;

const Value = styled.div`
	margin-bottom: 12px;
	color: var(--gold);
	font-size: clamp(28px, 4vw, 44px);
	font-weight: 800;
	line-height: 1;
	letter-spacing: -0.03em;
`;

const ItemLabel = styled.div`
	color: var(--text-muted);
	font-size: 13px;
	line-height: 1.4;
`;

const Note = styled.p`
	max-width: 640px;
	margin: 32px 0 0;
	color: var(--text-dim);
	font-size: 15px;
`;

const results = [
	["12+ млн", "просмотров"],
	["31 000+", "подписчиков"],
	["Миллионы", "просмотров на проектах клиентов"],
	["4+ года", "в создании Reels"],
];

export function Results() {
	return (
		<Section id="results">
			<Container>
				<UI.Reveal as={Label}>Результаты</UI.Reveal>
				<UI.Reveal as={Title}>
					Контент должен работать <Muted>не только на просмотры</Muted>
				</UI.Reveal>
				<UI.Reveal as={Grid}>
					{results.map(([value, label]) => (
						<Item key={label}>
							<Value>{value}</Value>
							<ItemLabel>{label}</ItemLabel>
						</Item>
					))}
				</UI.Reveal>
				<UI.Reveal as={Note}>
					Мы строим контент вокруг бизнес-задач: внимание → доверие → аудитория → заявки.
				</UI.Reveal>
			</Container>
		</Section>
	);
}
