import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { TELEGRAM_CONTACT_URL } from "../../shared/telegram";
import { sanityClient } from "../../shared/sanity/client";
import type { CaseStudyDocument } from "../../shared/sanity/types";
import { usePageMetadata } from "../../shared/usePageMetadata";
import { Footer } from "./Footer";

const overlayZIndex = 1000;

const CaseSkipLink = styled(UI.Anchor)`
	position: absolute;
	top: -64px;
	left: 12px;
	z-index: ${overlayZIndex + 1};
	padding: 10px 16px;
	border-radius: var(--radius-sm);
	background: var(--gold);
	color: #0a0a0a;
	font-weight: 600;
	text-decoration: none;

	&:focus {
		top: 12px;
	}
`;

const CaseHeader = styled.header`
	position: relative;
	z-index: 2;
	padding: 22px 0;
	border-bottom: 1px solid var(--border);
`;

const CaseHeaderInner = styled(UI.Container)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
`;

const CaseLogo = styled(UI.Anchor)`
	color: var(--text);
	font-size: 30px;
	font-weight: 800;
	letter-spacing: -0.02em;
	text-decoration: none;

	@media (max-width: 480px) {
		font-size: 20px;
	}
`;

const BackLink = styled(UI.OutlineLink)`
	padding: 10px 18px;
	font-size: 13px;
`;

const DetailHero = styled.section`
	padding: 76px 0 64px;

	@media (min-width: 768px) {
		padding: 112px 0 84px;
	}
`;

const DetailCategory = styled.div`
	margin-bottom: 16px;
	color: var(--gold);
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.12em;
	text-transform: uppercase;
`;

const DetailTitle = styled(UI.H1)`
	max-width: 900px;
	margin-bottom: 20px;
	font-size: clamp(38px, 8vw, 76px);
	font-weight: 800;
	line-height: 0.98;
	letter-spacing: -0.05em;
	overflow-wrap: anywhere;
`;

const DetailClient = styled.p`
	margin: 0 0 28px;
	color: var(--text-dim);
	font-size: 16px;
`;

const DetailTask = styled.p`
	max-width: 760px;
	margin: 0;
	color: var(--text-muted);
	font-size: clamp(17px, 2vw, 21px);
	font-weight: 300;
	line-height: 1.6;
`;

const MetricsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;
	margin-top: 44px;

	@media (min-width: 600px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const MetricCard = styled.div`
	display: flex;
	min-height: 128px;
	flex-direction: column;
	justify-content: space-between;
	padding: 20px 22px;
	border: 1px solid var(--border);
	border-radius: var(--radius-sm);
	background: linear-gradient(145deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.01));
`;

const MetricLabel = styled.span`
	color: var(--text-dim);
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.09em;
	text-transform: uppercase;
`;

const MetricValue = styled.strong`
	display: block;
	color: var(--text);
	font-size: clamp(25px, 3vw, 36px);
	font-weight: 700;
	line-height: 1.05;
	letter-spacing: -0.04em;
	overflow-wrap: anywhere;
`;

const OutcomePanel = styled.div`
	margin-top: 44px;
`;

const GrowthCard = styled.div`
	padding: 22px;
	border: 1px solid var(--border);
	border-radius: var(--radius-sm);
	background: linear-gradient(145deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.01));

	@media (min-width: 600px) {
		padding: 26px 28px;
	}
`;

const GrowthValues = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	align-items: center;
	gap: 12px;

	@media (min-width: 600px) {
		grid-template-columns: minmax(0, 1fr) 32px minmax(0, 1fr);
		align-items: end;
	}
`;

const GrowthValueGroup = styled.div`
	min-width: 0;

	@media (max-width: 599px) {
		text-align: center;
	}
`;

const GrowthValueLabel = styled.div`
	margin-bottom: 8px;
	color: var(--text-dim);
	font-size: 12px;
`;

const GrowthValue = styled.strong<{ $highlight?: boolean }>`
	display: block;
	color: ${({ $highlight }) => ($highlight ? "var(--gold)" : "var(--text)")};
	font-size: clamp(24px, 4vw, 42px);
	font-weight: 750;
	line-height: 1.15;
	letter-spacing: -0.045em;
	overflow-wrap: break-word;

	@media (max-width: 599px) {
		font-size: clamp(22px, 7vw, 30px);
	}
`;

const GrowthArrow = styled.span`
	padding-bottom: 5px;
	color: var(--gold);
	font-size: 22px;
	text-align: center;

	@media (max-width: 599px) {
		padding: 0;
		transform: rotate(90deg);
	}
`;

const DetailCoverFrame = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: clamp(360px, 48vw, 560px);
	align-items: center;
	justify-content: center;
	overflow: hidden;
	margin-top: 48px;
	border: 1px solid var(--border);
	border-radius: var(--radius);
	background: #101012;

	@media (max-width: 600px) {
		height: min(120vw, 480px);
		min-height: 340px;
		margin-top: 32px;
		border-radius: var(--radius-sm);
	}
`;

const DetailCoverBackdrop = styled.img`
	position: absolute;
	inset: -20px;
	width: calc(100% + 40px);
	height: calc(100% + 40px);
	object-fit: cover;
	filter: blur(22px);
	opacity: 0.24;
	transform: scale(1.05);
`;

const DetailCover = styled.img`
	position: relative;
	z-index: 1;
	display: block;
	width: 100%;
	height: 100%;
	padding: 12px;
	object-fit: contain;
	filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.4));
`;

const DetailContent = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 52px;
	padding: 24px 0 100px;

	@media (min-width: 900px) {
		grid-template-columns: minmax(0, 1fr) 280px;
		gap: 80px;
		padding-bottom: 140px;
	}
`;

const Narrative = styled.div`
	min-width: 0;
`;

const DetailSection = styled.section`
	margin-bottom: 48px;
`;

const DetailSectionTitle = styled(UI.H2)`
	margin-bottom: 16px;
	font-size: clamp(23px, 3vw, 32px);
	font-weight: 750;
	line-height: 1.15;
	letter-spacing: -0.03em;
`;

const DetailText = styled.p`
	margin: 0;
	color: var(--text-muted);
	font-size: 16px;
	font-weight: 300;
	line-height: 1.8;
	white-space: pre-line;
`;

const ResultsList = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;

	@media (min-width: 600px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const ResultItem = styled.div`
	padding: 18px;
	border: 1px solid var(--border);
	border-radius: var(--radius-sm);
	background: var(--bg-card);
`;

const ResultItemLabel = styled.div`
	margin-bottom: 8px;
	color: var(--text-dim);
	font-size: 12px;
`;

const ResultItemValue = styled.div`
	color: var(--gold);
	font-size: 22px;
	font-weight: 750;
`;

const MediaGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;

	@media (min-width: 700px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}
`;

const TestimonialImages = styled(MediaGrid)`
	margin-top: 16px;
`;

const MediaLink = styled.a`
	position: relative;
	display: flex;
	min-height: 150px;
	align-items: flex-end;
	overflow: hidden;
	padding: 14px;
	border: 1px solid var(--border);
	border-radius: var(--radius-sm);
	background: linear-gradient(135deg, #1a1a2e, #0f0f1a);
	color: var(--text);
	font-size: 13px;
	font-weight: 600;
	line-height: 1.35;
	text-decoration: none;

	&:hover,
	&:focus-visible {
		border-color: var(--gold-line);
	}
`;

const MediaImage = styled.img`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	opacity: 0.65;
`;

const MediaTitle = styled.span`
	position: relative;
	z-index: 1;
`;

const Screenshot = styled.img`
	display: block;
	width: 100%;
	max-height: 440px;
	border: 1px solid var(--border);
	border-radius: var(--radius-sm);
	background: var(--bg-card);
	object-fit: contain;
`;

const Testimonial = styled.blockquote`
	margin: 0;
	padding: 24px;
	border-left: 2px solid var(--gold);
	border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	background: var(--bg-card);
	color: var(--text-muted);
	font-size: 17px;
	font-weight: 300;
	line-height: 1.7;
	white-space: pre-line;
`;

const Aside = styled.aside`
	align-self: start;
	padding: 24px;
	border: 1px solid var(--border);
	border-radius: var(--radius);
	background: var(--bg-card);

	@media (min-width: 900px) {
		position: sticky;
		top: 30px;
	}
`;

const AsideTitle = styled(UI.H3)`
	margin-bottom: 12px;
	font-size: 20px;
	font-weight: 700;
	line-height: 1.25;
`;

const AsideText = styled.p`
	margin: 0 0 20px;
	color: var(--text-muted);
	font-size: 14px;
	line-height: 1.6;
`;

const AsideAction = styled(UI.GoldLink)`
	width: 100%;
	padding: 12px 16px;
	font-size: 14px;
`;

const StateMessage = styled.div`
	min-height: 55vh;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

const ErrorText = styled.p`
	margin: 0 0 24px;
	color: var(--text-muted);
	font-size: 16px;
	line-height: 1.6;
`;

const PreviewNotice = styled.div`
	padding: 10px 16px;
	background: var(--gold-soft);
	color: var(--gold);
	font-size: 12px;
	font-weight: 600;
	text-align: center;
`;

function DetailHeader() {
	return (
		<>
			<CaseSkipLink href="#case-content">Перейти к содержимому</CaseSkipLink>
			<CaseHeader>
				<CaseHeaderInner>
					<CaseLogo href="/">CONTENT PORT</CaseLogo>
					<BackLink href="/#cases">Все кейсы</BackLink>
				</CaseHeaderInner>
			</CaseHeader>
		</>
	);
}

function CaseDetailContent({ item, showFullPreview }: { item: CaseStudyDocument; showFullPreview: boolean }) {
	return (
		<>
			<DetailHero>
				<UI.Container>
					<DetailCategory>{item.category}</DetailCategory>
					<DetailTitle>{item.title}</DetailTitle>
					{item.clientName && <DetailClient>Клиент: {item.clientName}</DetailClient>}
					<DetailTask>{item.task || item.description}</DetailTask>
					{item.resultStats?.length ? (
						<MetricsGrid>
							{item.resultStats.map((stat) => (
								<MetricCard key={`${stat.metricType || stat.label}-${stat.value}`}>
									<MetricLabel>
										{stat.metricType === "Другое"
											? stat.customLabel || stat.label || "Другое"
											: stat.metricType || stat.label || "Показатель"}
									</MetricLabel>
									<MetricValue>{stat.value}</MetricValue>
								</MetricCard>
							))}
						</MetricsGrid>
					) : null}
					{(!item.resultStats?.length || showFullPreview) && (
						<OutcomePanel>
							<GrowthCard>
								<GrowthValues>
									<GrowthValueGroup>
										<GrowthValueLabel>До начала работы</GrowthValueLabel>
										<GrowthValue>{item.growthFrom}</GrowthValue>
									</GrowthValueGroup>
									<GrowthArrow aria-hidden="true">→</GrowthArrow>
									<GrowthValueGroup>
										<GrowthValueLabel>После работы</GrowthValueLabel>
										<GrowthValue $highlight>{item.growthTo}</GrowthValue>
									</GrowthValueGroup>
								</GrowthValues>
							</GrowthCard>
						</OutcomePanel>
					)}
					{item.thumbnailUrl && (
						<DetailCoverFrame>
							<DetailCoverBackdrop src={item.thumbnailUrl} alt="" aria-hidden="true" />
							<DetailCover src={item.thumbnailUrl} alt={`Обложка кейса: ${item.title}`} />
						</DetailCoverFrame>
					)}
				</UI.Container>
			</DetailHero>
			<UI.Container>
				<DetailContent>
					<Narrative>
						{item.initialSituation && (
							<DetailSection>
								<DetailSectionTitle>Исходная ситуация</DetailSectionTitle>
								<DetailText>{item.initialSituation}</DetailText>
							</DetailSection>
						)}
						{item.strategy && (
							<DetailSection>
								<DetailSectionTitle>Стратегия и концепция</DetailSectionTitle>
								<DetailText>{item.strategy}</DetailText>
							</DetailSection>
						)}
						{item.workDone && (
							<DetailSection>
								<DetailSectionTitle>Что сделали</DetailSectionTitle>
								<DetailText>{item.workDone}</DetailText>
							</DetailSection>
						)}
						{item.details && (
							<DetailSection>
								<DetailSectionTitle>Подробнее о проекте</DetailSectionTitle>
								<DetailText>{item.details}</DetailText>
							</DetailSection>
						)}
						{item.contentExamples?.length ? (
							<DetailSection>
								<DetailSectionTitle>Примеры контента</DetailSectionTitle>
								<MediaGrid>
									{item.contentExamples.map((example) => (
										<MediaLink href={example.url} key={`${example.url}-${example.title}`} target="_blank" rel="noopener noreferrer">
											{example.imageUrl && <MediaImage src={example.imageUrl} alt="" loading="lazy" />}
											<MediaTitle>{example.title}</MediaTitle>
										</MediaLink>
									))}
								</MediaGrid>
							</DetailSection>
						) : null}
						{item.statisticsScreenshots?.length ? (
							<DetailSection>
								<DetailSectionTitle>Результаты в цифрах</DetailSectionTitle>
								<MediaGrid>
									{item.statisticsScreenshots.map((src, index) => (
										<Screenshot src={src} alt={`Скриншот статистики ${index + 1}`} loading="lazy" key={src} />
									))}
								</MediaGrid>
							</DetailSection>
						) : null}
						{Boolean(item.testimonial || item.testimonialImages?.length) && (
							<DetailSection>
								<DetailSectionTitle>Отзыв клиента</DetailSectionTitle>
								{item.testimonial && <Testimonial>{item.testimonial}</Testimonial>}
								{item.testimonialImages?.length ? (
									<TestimonialImages>
										{item.testimonialImages.map((src, index) => (
											<Screenshot
												src={src}
												alt={`Изображение к отзыву ${index + 1}`}
												loading="lazy"
												key={src}
											/>
										))}
									</TestimonialImages>
								) : null}
							</DetailSection>
						)}
						{item.conclusion && (
							<DetailSection>
								<DetailSectionTitle>Итог</DetailSectionTitle>
								<DetailText>{item.conclusion}</DetailText>
							</DetailSection>
						)}
						{item.description && (
							<DetailSection>
								<DetailSectionTitle>Результат</DetailSectionTitle>
								<DetailText>{item.description}</DetailText>
							</DetailSection>
						)}
					</Narrative>
					<Aside>
						<AsideTitle>Хотите такой же результат?</AsideTitle>
						<AsideText>Обсудим вашу задачу и подберём подходящий формат работы.</AsideText>
						<AsideAction href={TELEGRAM_CONTACT_URL} target="_blank" rel="noopener noreferrer">Обсудить проект</AsideAction>
					</Aside>
				</DetailContent>
			</UI.Container>
		</>
	);
}

export function CaseDetailsPage({ slug, previewItem }: { slug: string; previewItem?: CaseStudyDocument }) {
	const [item, setItem] = useState<CaseStudyDocument | null>(previewItem ?? null);
	const [loading, setLoading] = useState(!previewItem);
	const [loadError, setLoadError] = useState(false);
	const pageDescription = item?.task || item?.description || "Результаты и подробности проекта CONTENT PORT.";
	usePageMetadata({
		title: item ? `${item.title} — кейс CONTENT PORT` : "Кейс — CONTENT PORT",
		description: pageDescription.length > 160 ? `${pageDescription.slice(0, 157).trimEnd()}...` : pageDescription,
		image: item?.thumbnailUrl,
		type: "article",
	});

	useEffect(() => {
		if (previewItem) {
			setItem(previewItem);
			setLoading(false);
			return;
		}

		let active = true;
		sanityClient
			.fetch<CaseStudyDocument | null>(
				`*[_type == "caseStudy" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
					_id,
					"slug": slug.current,
					title,
					clientName,
					category,
					task,
					metricValue,
					growthFrom,
					growthTo,
					description,
					initialSituation,
					strategy,
					workDone,
					conclusion,
					details,
					resultStats[] { metricType, customLabel, label, value },
					"thumbnailUrl": thumbnail.asset->url,
					contentExamples[] { title, url, "imageUrl": image.asset->url },
					"statisticsScreenshots": statisticsScreenshots[].asset->url,
					testimonial,
					"testimonialImages": testimonialImages[].asset->url,
					order
				}`,
				{ slug },
			)
			.then((document) => {
				if (!active) return;
				if (document) setItem(document);
				else setLoadError(true);
			})
			.catch((error: unknown) => {
				console.error(`Could not load case study "${slug}" from Sanity.`, error);
				if (active) setLoadError(true);
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
		};
	}, [previewItem, slug]);

	return (
		<>
			{previewItem && <PreviewNotice>ПРЕДПРОСМОТР ДЕМО-КЕЙСА — ДАННЫЕ ВЫМЫШЛЕНЫ</PreviewNotice>}
			<DetailHeader />
			<UI.Main id="case-content" tabIndex={-1}>
				{item && <CaseDetailContent item={item} showFullPreview={Boolean(previewItem)} />}
				{loading && (
					<UI.Container>
						<StateMessage role="status" aria-live="polite">
							<ErrorText>Загружаем кейс…</ErrorText>
						</StateMessage>
					</UI.Container>
				)}
				{!loading && loadError && (
					<UI.Container>
						<StateMessage role="alert">
							<DetailCategory>Кейс не найден</DetailCategory>
							<DetailTitle>Не удалось открыть этот кейс</DetailTitle>
							<ErrorText>Возможно, ссылка устарела или кейс пока не опубликован.</ErrorText>
							<BackLink href="/#cases">Вернуться к кейсам</BackLink>
						</StateMessage>
					</UI.Container>
				)}
			</UI.Main>
			<Footer homeHref="/" />
		</>
	);
}
