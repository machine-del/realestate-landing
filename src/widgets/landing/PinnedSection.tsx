import type { ReactNode } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Section = styled.section`
	position: relative;
	height: 220vh;
	padding: 0;

	@media (prefers-reduced-motion: reduce) {
		height: auto;
	}
`;

const StickyContainer = styled.div`
	position: sticky;
	top: 0;
	display: flex;
	height: 100vh;
	height: 100svh;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	padding: 0 24px;

	@media (prefers-reduced-motion: reduce) {
		position: relative;
		height: auto;
		padding: 100px 24px;
	}
`;

const Inner = styled.div<{ $final: boolean }>`
	width: 100%;
	max-width: 1100px;
	text-align: center;
	will-change: transform, opacity;
	transform: translateZ(0);

	${({ $final }) =>
		$final &&
		`
			position: relative;
			z-index: 1;
		`}

	@media (prefers-reduced-motion: reduce) {
		transform: none !important;
		opacity: 1 !important;
	}
`;

const Title = styled.h2<{ $final: boolean }>`
	margin-bottom: ${({ $final }) => ($final ? "24px" : "0")};
	color: var(--text);
	font-size: ${({ $final }) =>
		$final ? "clamp(32px, 6vw, 68px)" : "clamp(32px, 6vw, 72px)"};
	font-weight: 800;
	line-height: 1.05;
	letter-spacing: -0.04em;
`;

const pinLineStyle = css`
	display: block;
	opacity: 0;
	transform: translateY(30px);
	transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);

	@media (prefers-reduced-motion: reduce) {
		opacity: 1;
		transform: none;
	}
`;

const Line = styled.span`${pinLineStyle}`;

const Accent = styled.span`
	color: var(--gold);
`;

const Subtitle = styled.p<{ $final: boolean }>`
	${pinLineStyle}
	max-width: ${({ $final }) => ($final ? "600px" : "640px")};
	margin: ${({ $final }) => ($final ? "0 auto 40px" : "24px auto 0")};
	color: var(--text-muted);
	font-size: ${({ $final }) =>
		$final ? "clamp(16px, 2.2vw, 19px)" : "clamp(16px, 2.2vw, 20px)"};
	font-weight: 300;
	line-height: 1.6;
`;

const Progress = styled.div`
	position: absolute;
	bottom: 40px;
	left: 50%;
	width: 120px;
	height: 2px;
	overflow: hidden;
	transform: translateX(-50%);
	border-radius: 2px;
	background: rgba(255, 255, 255, 0.12);

	@media (prefers-reduced-motion: reduce) {
		display: none;
	}
`;

const ProgressBar = styled.div`
	position: absolute;
	inset: 0;
	transform: scaleX(0);
	transform-origin: left center;
	border-radius: 2px;
	background: var(--gold);
`;

const Actions = styled.div`
	${pinLineStyle}
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 12px;
`;

interface PinnedSectionProps {
	id: string;
	innerId: string;
	progressId: string;
	lines: string[];
	subtitle?: string;
	final?: boolean;
	children?: ReactNode;
}

export function PinnedSection({
	id,
	innerId,
	progressId,
	lines,
	subtitle,
	final = false,
	children,
}: PinnedSectionProps) {
	return (
		<Section id={id}>
			<StickyContainer>
				<Inner $final={final} id={innerId}>
					<Title $final={final}>
						{lines.map((line, index) => (
							<Line key={`${index}-${line}`}>
								{index === lines.length - 1 ? <Accent>{line}</Accent> : line}
							</Line>
						))}
					</Title>
					{subtitle && (
						<Subtitle $final={final}>
							{subtitle}
						</Subtitle>
					)}
					{children && <Actions>{children}</Actions>}
				</Inner>
				<Progress>
					<ProgressBar id={progressId} />
				</Progress>
			</StickyContainer>
		</Section>
	);
}
