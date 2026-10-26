import { Global, css } from '@emotion/react';
import { useLandingInteractions } from '../shared/useLandingInteractions';
import { LandingStyles } from '../shared/styles/LandingStyles';
import * as UI from '../shared/ui/StyledElements';
import { Footer } from '../widgets/landing/Footer';
import { Hero } from '../widgets/landing/Hero';
import { HeroSlider } from '../widgets/landing/HeroSlider';
import { Results } from '../widgets/landing/Results';
import { Sections } from '../widgets/landing/Sections';
import { Navigation } from '../widgets/navigation/Navigation';
import { CaseDetailsPage } from '../widgets/landing/CaseDetailsPage';
import { usePageMetadata } from '../shared/usePageMetadata';
import { mockCaseStudy } from '../shared/sanity/mockCaseStudy';

const casePageMatch = window.location.pathname.match(/^\/cases\/([^/]+)\/?$/);
const caseSlug = casePageMatch ? decodeURIComponent(casePageMatch[1]) : null;
const isCasePreview = import.meta.env.DEV && caseSlug === 'mock-preview';

function LandingPageMetadata() {
	usePageMetadata({
		title: 'CONTENT PORT — контент и маркетинг для рынка недвижимости',
		description: 'CONTENT PORT — стратегия, сценарии, съёмка и монтаж коротких видео для риелторов, агентств недвижимости и экспертов.',
	});
	return null;
}

function GlobalStyles() {
	return (
		<Global
			styles={css`
				html {
					scroll-behavior: smooth;
					-webkit-text-size-adjust: 100%;
				}
				body {
					margin: 0;
					background: #0a0a0a;
				}
				@media (prefers-reduced-motion: reduce) {
					html {
						scroll-behavior: auto;
					}
					*,
					*::before,
					*::after {
						animation-duration: 0.01ms !important;
						animation-iteration-count: 1 !important;
						scroll-behavior: auto !important;
						transition-duration: 0.01ms !important;
					}
				}
			`}
		/>
	);
}

export function App() {
	useLandingInteractions();

	return (
		<>
			<GlobalStyles />
			<LandingStyles>
				{caseSlug ? (
					<CaseDetailsPage slug={caseSlug} previewItem={isCasePreview ? mockCaseStudy : undefined} />
				) : (
					<>
						<LandingPageMetadata />
						<Navigation />
						<UI.Main id="main-content" tabIndex={-1}>
							<Hero />
							<HeroSlider />
							<Results />
							<Sections />
						</UI.Main>
						<Footer />
					</>
				)}
			</LandingStyles>
		</>
	);
}