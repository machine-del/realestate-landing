import { useEffect, useId, useState, type ElementType, type ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Div = styled.div``;
export const Section = styled.section`
	position: relative;
	padding: 100px 0;

	@media (min-width: 1024px) {
		padding: 140px 0;
	}
`;
export const Nav = styled.nav``;
export const Main = styled.main``;
export const Footer = styled.footer``;
export const Anchor = styled.a``;
export const Button = styled.button``;

const buttonBase = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 14px 28px;
	border: 1px solid transparent;
	border-radius: var(--radius-pill);
	font-family: inherit;
	font-size: 15px;
	font-weight: 500;
	letter-spacing: -0.01em;
	text-decoration: none;
	white-space: nowrap;
	cursor: pointer;
	transition: all 0.35s var(--ease);
`;

export const GoldLink = styled.a`
	${buttonBase}
	border-color: var(--gold);
	background: var(--gold);
	color: #0a0a0a;

	&:hover {
		transform: translateY(-2px);
		border-color: #d9bc82;
		background: #d9bc82;
		box-shadow: 0 12px 32px rgba(201, 169, 106, 0.25);
	}
`;

export const OutlineLink = styled.a`
	${buttonBase}
	border-color: var(--border-strong);
	background: transparent;
	color: var(--text);

	&:hover {
		transform: translateY(-2px);
		border-color: var(--gold);
		color: var(--gold);
	}
`;

export const GoldButton = styled.button`
	${buttonBase}
	border-color: var(--gold);
	background: var(--gold);
	color: #0a0a0a;

	&:hover {
		transform: translateY(-2px);
		border-color: #d9bc82;
		background: #d9bc82;
		box-shadow: 0 12px 32px rgba(201, 169, 106, 0.25);
	}
`;

export const OutlineButton = styled.button`
	${buttonBase}
	border-color: var(--border-strong);
	background: transparent;
	color: var(--text);

	&:hover {
		transform: translateY(-2px);
		border-color: var(--gold);
		color: var(--gold);
	}
`;

export const SmallGoldLink = styled(GoldLink)`
	padding: 10px 20px;
	font-size: 14px;
`;

export const LargeGoldLink = styled(GoldLink)`
	padding: 18px 36px;
	font-size: 16px;
`;

export const LargeOutlineLink = styled(OutlineLink)`
	padding: 18px 36px;
	font-size: 16px;
`;
export const Span = styled.span``;
export const Paragraph = styled.p``;
export const H1 = styled.h1``;
export const H2 = styled.h2``;
export const H3 = styled.h3``;
export const H4 = styled.h4``;
export const UnorderedList = styled.ul``;
export const ListItem = styled.li``;
export const Svg = styled.svg``;
export const Defs = styled.defs``;
export const LinearGradient = styled.linearGradient``;
export const Stop = styled.stop``;
export const Path = styled.path``;
export const Circle = styled.circle``;
export const Polygon = styled.polygon``;
export const Rect = styled.rect``;
export const Line = styled.line``;
export const Break = styled.br``;

export const Container = styled.div`
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

export const SectionLabel = styled.div`
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

export const SectionTitle = styled.h2`
	max-width: 900px;
	margin: 0 0 20px;
	font-size: clamp(28px, 4.5vw, 52px);
	font-weight: 800;
	line-height: 1.1;
	letter-spacing: -0.03em;

`;

export const MutedText = styled.span`
	color: var(--text-dim);
`;

export const AccentText = styled.span`
	color: var(--gold);
`;

const RevealElement = styled.div<{ $visible: boolean }>`
	opacity: ${({ $visible }) => ($visible ? 1 : 0)};
	transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(40px)")};
	transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);

	@media (prefers-reduced-motion: reduce) {
		opacity: 1;
		transform: none;
		transition: none;
	}
`;

interface RevealProps {
	as?: ElementType;
	children?: ReactNode;
	id?: string;
}

export function Reveal({ as = "div", children, id: suppliedId }: RevealProps) {
	const generatedId = useId().replace(/:/g, "");
	const id = suppliedId ?? `reveal-${generatedId}`;
	const [visible, setVisible] = useState(
		() => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	);

	useEffect(() => {
		if (visible) return;
		const element = document.getElementById(id);
		if (!element) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setVisible(true);
				observer.disconnect();
			},
			{ threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
		);
		observer.observe(element);
		return () => observer.disconnect();
	}, [id, visible]);

	return (
		<RevealElement as={as} id={id} $visible={visible} onFocusCapture={() => setVisible(true)}>
			{children}
		</RevealElement>
	);
}
