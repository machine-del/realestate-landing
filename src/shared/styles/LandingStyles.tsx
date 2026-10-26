import styled from "@emotion/styled";

export const LandingStyles = styled.div`
	--bg: #0a0a0a;
	--bg-soft: #111111;
	--bg-card: #141414;
	--text: #ffffff;
	--text-muted: #8a8a8a;
	--text-dim: #858585;
	--gold: #c9a96a;
	--gold-soft: rgba(201, 169, 106, 0.12);
	--gold-line: rgba(201, 169, 106, 0.25);
	--border: rgba(255, 255, 255, 0.08);
	--border-strong: rgba(255, 255, 255, 0.14);
	--radius: 16px;
	--radius-sm: 10px;
	--radius-pill: 100px;
	--ease: cubic-bezier(0.22, 1, 0.36, 1);
	min-height: 100vh;
	overflow-x: clip;
	background: var(--bg);
	color: var(--text);
	font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
	line-height: 1.5;
	-webkit-font-smoothing: antialiased;
	font-feature-settings: "ss01", "cv01";

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	&,
	* {
		margin: 0;
		padding: 0;
	}

	::selection {
		background: var(--gold);
		color: #000;
	}

	:where(a) {
		color: inherit;
	}

	a:focus-visible,
	button:focus-visible,
	[role="button"]:focus-visible {
		outline: 2px solid var(--gold);
		outline-offset: 3px;
	}
`;
