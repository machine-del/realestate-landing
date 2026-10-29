import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { sanityClient } from "../../shared/sanity/client";
import { caseStudiesQuery } from "../../shared/sanity/caseStudies";
import type { CaseStudyDocument } from "../../shared/sanity/types";

const CaseStudyCaseList = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 20px;
	margin-top: 60px;

	@media (min-width: 680px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (min-width: 1100px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
	}
`;

const CaseCard = styled.article`
	display: flex;
	min-width: 0;
	flex-direction: column;
	overflow: hidden;
	border: 1px solid var(--border);
	border-radius: var(--radius);
	background: var(--bg-card);
	transition: transform 0.35s var(--ease), border-color 0.35s var(--ease);

	&:hover,
	&:focus-within {
		transform: translateY(-5px);
		border-color: var(--gold-line);
	}
`;

const CaseVisual = styled.div`
	position: relative;
	display: flex;
	min-height: 205px;
	align-items: flex-end;
	overflow: hidden;
	padding: 24px;
	background:
		radial-gradient(circle at 75% 20%, rgba(201, 169, 106, 0.2), transparent 38%),
		linear-gradient(135deg, #1a1a2e, #0f0f1a);
`;

const CaseImage = styled.img`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	opacity: 0.72;
`;

const CaseVisualOverlay = styled.div`
	position: absolute;
	inset: 0;
	background: linear-gradient(180deg, rgba(10, 10, 10, 0.04), rgba(10, 10, 10, 0.8));
`;

const CaseVisualLabel = styled.span`
	position: relative;
	z-index: 1;
	color: var(--text);
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.12em;
	text-transform: uppercase;
`;

const CaseBody = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: flex-start;
	padding: 24px;
`;

const CaseCategory = styled.div`
	margin-bottom: 9px;
	color: var(--gold);
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-transform: uppercase;
`;

const CaseTitle = styled(UI.H3)`
	margin-bottom: 10px;
	font-size: clamp(20px, 2.4vw, 25px);
	font-weight: 750;
	line-height: 1.2;
	letter-spacing: -0.03em;
`;

const CaseTask = styled(UI.Paragraph)`
	display: -webkit-box;
	margin-bottom: 8px;
	overflow: hidden;
	color: var(--text-muted);
	font-size: 14px;
	font-weight: 300;
	line-height: 1.6;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
`;

const CaseTaskLabel = styled.span`
	display: block;
	margin-bottom: 4px;
	color: var(--text-dim);
	font-size: 10px;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-transform: uppercase;
`;

const CaseWork = styled(UI.Paragraph)`
	display: -webkit-box;
	min-height: 2.8em;
	margin-bottom: 18px;
	overflow: hidden;
	color: var(--text-muted);
	font-size: 12px;
	font-weight: 300;
	line-height: 1.5;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
`;

const CaseResult = styled.div`
	display: flex;
	width: 100%;
	align-items: baseline;
	gap: 9px;
	margin-top: auto;
	margin-bottom: 20px;
	padding: 14px 16px;
	border: 1px solid var(--gold-line);
	border-radius: var(--radius-sm);
	background: var(--gold-soft);
`;

const CaseResultValue = styled.strong`
	color: var(--gold);
	font-size: clamp(22px, 3vw, 30px);
	font-weight: 800;
	letter-spacing: -0.04em;
`;

const CaseResultLabel = styled.span`
	color: var(--text-muted);
	font-size: 12px;
	line-height: 1.35;
`;

const CaseGrowth = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: minmax(0, 1fr) 24px minmax(0, 1fr);
	align-items: center;
	gap: 8px;
	margin-bottom: 18px;
	padding: 14px 16px;
	border: 1px solid var(--border);
	border-radius: var(--radius-sm);
	background: rgba(255, 255, 255, 0.025);
`;

const CaseGrowthItem = styled.div`
	min-width: 0;
`;

const CaseGrowthLabel = styled.span`
	display: block;
	margin-bottom: 5px;
	color: var(--text-dim);
	font-size: 9px;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-transform: uppercase;
`;

const CaseGrowthValue = styled.strong<{ $highlight?: boolean }>`
	display: block;
	color: ${({ $highlight }) => ($highlight ? "var(--gold)" : "var(--text-muted)")};
	font-size: 13px;
	font-weight: 600;
	line-height: 1.35;
	overflow-wrap: anywhere;
`;

const CaseGrowthArrow = styled.span`
	color: var(--gold);
	font-size: 18px;
	text-align: center;
`;

const CaseActions = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: flex-start;
`;

const CaseAction = styled(UI.GoldLink)`
	padding: 11px 20px;
	font-size: 14px;
`;

const CaseEmptyState = styled.div`
	grid-column: 1 / -1;
	padding: clamp(28px, 6vw, 56px);
	border: 1px solid var(--border);
	border-radius: var(--radius);
	background: var(--bg-card);
	text-align: center;
`;

const CaseEmptyTitle = styled(UI.H3)`
	margin-bottom: 8px;
	font-size: clamp(20px, 3vw, 26px);
	font-weight: 700;
`;

const CaseEmptyText = styled(UI.Paragraph)`
	color: var(--text-muted);
	font-size: 15px;
	line-height: 1.6;
`;

const CaseLoadError = styled(UI.Paragraph)`
	margin-top: 10px;
	color: var(--text-dim);
	font-size: 13px;
`;

export function CaseStudy({ initialCaseStudies }: { initialCaseStudies?: CaseStudyDocument[] }) {
	const [caseStudies, setCaseStudies] = useState<CaseStudyDocument[]>(initialCaseStudies ?? []);
	const [loadError, setLoadError] = useState(false);
	const [loading, setLoading] = useState(initialCaseStudies === undefined);

	useEffect(() => {
		if (initialCaseStudies !== undefined) return;
		let active = true;
		sanityClient
			.fetch<CaseStudyDocument[]>(caseStudiesQuery)
			.then((documents) => {
				if (!active) return;
				setCaseStudies(documents);
			})
			.catch((error: unknown) => {
				console.error("Could not load published case studies from Sanity.", error);
				if (!active) return;
				setLoadError(true);
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
		};
	}, [initialCaseStudies]);

	return (
		<UI.Section id="cases">
			<UI.Container>
				<UI.Reveal as={UI.SectionLabel}>Кейсы</UI.Reveal>
				<UI.Reveal as={UI.SectionTitle}>
					Наш результат говорит
					<UI.MutedText> сам за себя.</UI.MutedText>
				</UI.Reveal>
				<CaseStudyCaseList>
					{caseStudies.map((item) => (
						<UI.Reveal as={CaseCard} key={item._id}>
							<CaseVisual>
								{item.thumbnailUrl && (
									<CaseImage src={item.thumbnailUrl} alt={`Проект ${item.clientName || item.title}`} loading="lazy" />
								)}
								<CaseVisualOverlay />
								<CaseVisualLabel>{item.clientName || item.title}</CaseVisualLabel>
							</CaseVisual>
							<CaseBody>
								<CaseCategory>{item.category}</CaseCategory>
								<CaseTitle>{item.title}</CaseTitle>
								<CaseTaskLabel>Задача</CaseTaskLabel>
								<CaseTask>{item.task || item.description}</CaseTask>
								{item.workDone && (
									<>
										<CaseTaskLabel>Что сделали</CaseTaskLabel>
										<CaseWork>{item.workDone}</CaseWork>
									</>
								)}
								<CaseResult>
									<CaseResultValue>{item.metricValue}</CaseResultValue>
									<CaseResultLabel>{item.metricLabel}</CaseResultLabel>
								</CaseResult>
								{(item.growthFrom || item.growthTo) && (
									<CaseGrowth aria-label="Изменение показателя">
										<CaseGrowthItem>
											<CaseGrowthLabel>Было</CaseGrowthLabel>
											<CaseGrowthValue>{item.growthFrom || "—"}</CaseGrowthValue>
										</CaseGrowthItem>
										<CaseGrowthArrow aria-hidden="true">→</CaseGrowthArrow>
										<CaseGrowthItem>
											<CaseGrowthLabel>Стало</CaseGrowthLabel>
											<CaseGrowthValue $highlight>{item.growthTo || "—"}</CaseGrowthValue>
										</CaseGrowthItem>
									</CaseGrowth>
								)}
								<CaseActions>
									<CaseAction href={`/cases/${encodeURIComponent(item.slug || item._id)}/`}>
										Подробнее
									</CaseAction>
								</CaseActions>
							</CaseBody>
						</UI.Reveal>
					))}
					{!loading && caseStudies.length === 0 && (
						<CaseEmptyState>
							<CaseEmptyTitle>Кейсы скоро появятся</CaseEmptyTitle>
							<CaseEmptyText>
								Скоро здесь появится информация о проектах, задачах и результатах нашей работы.
							</CaseEmptyText>
							{loadError && (
								<CaseLoadError role="status">
									Сейчас не удалось загрузить данные. Попробуйте зайти позже.
								</CaseLoadError>
							)}
						</CaseEmptyState>
					)}
				</CaseStudyCaseList>
			</UI.Container>
		</UI.Section>
	);
}
