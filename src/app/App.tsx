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
import type { CaseStudyDocument } from '../shared/sanity/types';
import { getSiteData } from '../shared/siteData';
import { SITE_DESCRIPTION, SITE_TITLE } from '../shared/seo';

interface AppProps {
	pathname?: string;
	initialCaseStudies?: CaseStudyDocument[];
	initialCase?: CaseStudyDocument;
}

function LandingPageMetadata() {
	usePageMetadata({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
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

export function App({
	pathname = typeof window === 'undefined' ? '/' : window.location.pathname,
	initialCaseStudies = getSiteData().caseStudies,
	initialCase = getSiteData().caseStudy,
}: AppProps = {}) {
	useLandingInteractions();
	const casePageMatch = pathname.match(/^\/cases\/([^/]+)\/?$/);
	const caseSlug = casePageMatch ? decodeURIComponent(casePageMatch[1]) : null;
	const isCasePreview = import.meta.env.DEV && caseSlug === 'mock-preview';

	return (
		<>
			<GlobalStyles />
			<LandingStyles>
				{caseSlug ? (
					<CaseDetailsPage
						slug={caseSlug}
						previewItem={isCasePreview ? mockCaseStudy : undefined}
						initialItem={initialCase}
					/>
				) : (
					<>
						<LandingPageMetadata />
						<Navigation />
						<UI.Main id="main-content" tabIndex={-1}>
							<Hero />
							<HeroSlider />
							<Results />
							<Sections initialCaseStudies={initialCaseStudies} />
						</UI.Main>
						<Footer />
					</>
				)}
			</LandingStyles>
		</>
	);
}