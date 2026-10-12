import { Global, css } from '@emotion/react';
import { useLandingInteractions } from '../shared/useLandingInteractions';
import { LandingStyles } from '../shared/styles/LandingStyles';
import * as UI from '../shared/ui/StyledElements';
import { Footer } from '../widgets/landing/Footer';
import { Hero } from '../widgets/landing/Hero';
import { Results } from '../widgets/landing/Results';
import { Sections } from '../widgets/landing/Sections';
import { Navigation } from '../widgets/navigation/Navigation';
import { CaseDetailsPage } from '../widgets/landing/CaseDetailsPage';

const casePageMatch = window.location.pathname.match(/^\/cases\/([^/]+)\/?$/);
const caseSlug = casePageMatch ? decodeURIComponent(casePageMatch[1]) : null;

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
					<CaseDetailsPage slug={caseSlug} />
				) : (
					<>
						<Navigation />
						<UI.Main>
							<Hero />
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