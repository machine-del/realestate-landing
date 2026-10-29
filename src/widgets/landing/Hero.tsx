import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { TELEGRAM_CONTACT_URL } from "../../shared/telegram";
import reelVideo from "../../../assets/videos/AQNABOFTMGor31iDbafUdRkvvZvO01CzlQUIsMGouGOn6yizwdfxgQGcfbFX8I_6zpHAxU2iRciTzLEHB2mHrngzzTTfjXSkyExdvP8.mp4";
import reelPoster from "../../../assets/videos/preview/preview.jpg";

const HeroHeroGrid = styled(UI.Div)`		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
		gap: 60px;

		@media (min-width: 1024px) {
			grid-template-columns: 1.1fr 0.9fr;
			gap: 80px;
		}
	`;
const HeroHeroContent = styled(UI.Div)`
	display: block;
`;
const HeroAccent = styled(UI.AccentText)`
	color: var(--gold);
`;
const HeroHeroEyebrow = styled(UI.Div)`		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 32px;
		padding: 8px 16px;
		border: 1px solid var(--gold-line);
		border-radius: var(--radius-pill);
		background: var(--gold-soft);
		color: var(--gold);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	`;
const HeroHeroTitle = styled(UI.H1)`		margin-bottom: 28px;
		font-size: clamp(32px, 6.5vw, 50px);
		font-weight: 800;
		line-height: 1.05;
		letter-spacing: -0.035em;

	`;
const HeroHeroSub = styled(UI.Paragraph)`		max-width: 560px;
		margin-bottom: 40px;
		color: var(--text-muted);
		font-size: clamp(16px, 2.2vw, 19px);
		font-weight: 300;
		line-height: 1.55;
	`;
const HeroHeroActions = styled(UI.Div)`		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-bottom: 28px;
	`;
const HeroHeroTrust = styled(UI.Paragraph)`		max-width: 480px;
		padding-left: 16px;
		border-left: 2px solid var(--gold-line);
		color: var(--text-dim);
		font-size: 13px;
		line-height: 1.6;
	`;
const HeroHeroVisual = styled(UI.Div)`		position: relative;
		display: flex;
		min-height: 480px;
		align-items: center;
		justify-content: center;

		@media (max-width: 767px) {
			min-height: 400px;
		}
	`;
const HeroPhoneMock = styled(UI.Div)`		position: relative;
		width: 240px;
		height: 480px;
		overflow: hidden;
		border: 1px solid var(--border-strong);
		border-radius: 36px;
		background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
		box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04);
		animation: floatPhone 6s ease-in-out infinite;

		@media (max-width: 767px) {
			width: 200px;
			height: 400px;
		}
	`;
const HeroPhoneNotch = styled(UI.Div)`		position: absolute;
		top: 12px;
		left: 50%;
		z-index: 2;
		width: 70px;
		height: 18px;
		transform: translateX(-50%);
		border-radius: 12px;
		background: #000;
	`;
const HeroPhoneScreen = styled(UI.Div)`		position: absolute;
		inset: 6px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: 30px;
		background: #0a0a0a;
	`;
const HeroReelUi = styled(UI.Div)`		position: relative;
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		padding: 24px 16px;
	`;
const HeroReelBg = styled.video`		position: absolute;
		inset: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		background: #0f0f1a;
	`;
const HeroReelOverlay = styled(UI.Div)`
	position: absolute;
	inset: 0;
	z-index: 0;
	background: linear-gradient(180deg, rgba(0, 0, 0, 0.18), transparent 35%, transparent 62%, rgba(0, 0, 0, 0.78));
	pointer-events: none;
`;
const HeroReelPreview = styled.img<{ $visible: boolean }>`
	position: absolute;
	inset: 0;
	z-index: 1;
	width: 100%;
	height: 100%;
	object-fit: cover;
	opacity: ${({ $visible }) => ($visible ? 1 : 0)};
	pointer-events: none;
	transition: opacity 450ms ease;

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;
const HeroReelSoundButton = styled.button`
	position: absolute;
	right: 12px;
	bottom: 18px;
	z-index: 3;
	display: flex;
	width: 36px;
	height: 36px;
	align-items: center;
	justify-content: center;
	padding: 0;
	border: 1px solid rgba(255, 255, 255, 0.22);
	border-radius: 50%;
	background: rgba(0, 0, 0, 0.58);
	color: #fff;
	cursor: pointer;
	backdrop-filter: blur(8px);

	&:hover,
	&:focus-visible {
		border-color: var(--gold);
		color: var(--gold);
	}

	&:focus-visible {
		outline: 2px solid var(--gold);
		outline-offset: 2px;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.55;
	}
`;
const HeroReelPlaybackButton = styled(HeroReelSoundButton)`
	right: auto;
	left: 12px;
`;
const HeroReelSoundIcon = styled(UI.Svg)`
	width: 18px;
	height: 18px;
	fill: none;
	stroke: currentColor;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-width: 1.7;
`;
const HeroReelTop = styled(UI.Div)`		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	`;
const HeroReelTag = styled(UI.Span)`		padding: 5px 10px;
		border: 1px solid var(--gold-line);
		border-radius: var(--radius-pill);
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);
		color: var(--gold);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	`;
const HeroReelSide = styled(UI.Div)`		position: absolute;
		right: 12px;
		bottom: 90px;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	`;
const HeroReelIcon = styled(UI.Div)`		display: flex;
		width: 32px;
		height: 32px;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(8px);

	`;
const HeroReelIconSvg = styled(UI.Svg)`
	width: 16px;
	height: 16px;
	fill: none;
	stroke: #fff;
	stroke-width: 1.5;
`;
const HeroReelStat = styled(UI.Div)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const HeroReelCount = styled(UI.Div)`		margin-top: 2px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 9px;
		text-align: center;
	`;
const HeroReelBottom = styled(UI.Div)`		position: relative;
		z-index: 1;
	`;
const HeroReelUser = styled(UI.Div)`		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 10px;
	`;
const HeroReelAvatar = styled(UI.Div)`		width: 28px;
		height: 28px;
		border: 1.5px solid #fff;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--gold), #8b6f3f);
	`;
const HeroReelName = styled(UI.Div)`		font-size: 11px;
		font-weight: 600;
	`;
const HeroReelText = styled(UI.Div)`		max-width: 80%;
		color: rgba(255, 255, 255, 0.8);
		font-size: 11px;
		line-height: 1.4;
	`;
const HeroReelProgress = styled(UI.Div)<{ $progress: number }>`		position: absolute;
		right: 16px;
		bottom: 8px;
		left: 16px;
		z-index: 1;
		height: 2px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.15);

		&::after {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: ${({ $progress }) => `${$progress}%`};
			border-radius: 2px;
			background: #fff;
			content: "";
			transition: width 100ms linear;
		}
	`;
const HeroHeroFloatCard = styled(UI.Div)`		position: absolute;
		padding: 16px 20px;
		border: 1px solid var(--border-strong);
		border-radius: var(--radius);
		background: rgba(20, 20, 20, 0.9);
		backdrop-filter: blur(20px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
		animation: floatCard 5s ease-in-out infinite;

		@media (max-width: 767px) {
			display: none;
		}
	`;
const HeroHeroFloat1 = styled(HeroHeroFloatCard)`
		top: 10%;
		left: -10px;
		animation-delay: 0.5s;
	`;
const HeroHeroFloat2 = styled(HeroHeroFloatCard)`
		right: -10px;
		bottom: 15%;
		animation-delay: 1.5s;
	`;
const HeroFloatLabel = styled(UI.Div)`		margin-bottom: 4px;
		color: var(--text-dim);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	`;
const HeroFloatValue = styled(UI.Div)`		color: var(--text);
		font-size: 22px;
		font-weight: 700;
		letter-spacing: -0.02em;

	`;

const HeroSection = styled(UI.Section)`
	display: flex;
	min-height: 100vh;
	align-items: center;
	overflow: hidden;
	padding: 140px 0 80px;

	&::before {
		position: absolute;
		top: -20%;
		right: -10%;
		width: 60vw;
		height: 60vw;
		max-width: 800px;
		max-height: 800px;
		background: radial-gradient(circle, rgba(201, 169, 106, 0.08) 0%, transparent 70%);
		content: "";
		pointer-events: none;
	}

	@keyframes floatPhone {
		0%,
		100% {
			transform: translateY(0) rotate(-2deg);
		}
		50% {
			transform: translateY(-16px) rotate(-2deg);
		}
	}

	@keyframes floatCard {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
`;

export function Hero() {
	const [showReelPreview, setShowReelPreview] = useState(true);
	const [isReelStarted, setIsReelStarted] = useState(false);
	const [isReelPlaying, setIsReelPlaying] = useState(true);
	const [isReelMuted, setIsReelMuted] = useState(true);
	const [reelProgress, setReelProgress] = useState(0);
	const reelVideoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setIsReelPlaying(false);
		}
	}, []);

	useEffect(() => {
		if (!isReelPlaying) return;
		const timeout = window.setTimeout(() => {
			setIsReelStarted(true);
			setShowReelPreview(false);
		}, 3000);
		return () => window.clearTimeout(timeout);
	}, [isReelPlaying]);

	useEffect(() => {
		const video = reelVideoRef.current;
		const visual = document.getElementById("heroVisual");
		if (!video || !visual) return;

		let isInViewport = false;
		const updatePlayback = () => {
			if (!isReelPlaying || !isInViewport || document.visibilityState !== "visible") {
				video.pause();
				return;
			}

			video.play().catch((error: unknown) => {
				if (error instanceof DOMException && error.name === "AbortError") return;
				console.error("Could not play the hero reel video.", error);
			});
		};

		const observer = new IntersectionObserver(
			([entry]) => {
				isInViewport = entry.isIntersecting;
				updatePlayback();
			},
			{ threshold: 0.15 },
		);
		const onVisibilityChange = () => updatePlayback();

		observer.observe(visual);
		document.addEventListener("visibilitychange", onVisibilityChange);

		return () => {
			observer.disconnect();
			document.removeEventListener("visibilitychange", onVisibilityChange);
			video.pause();
		};
	}, [isReelPlaying]);

	return (
		<HeroSection>
			<UI.Container>
				<HeroHeroGrid>
					<HeroHeroContent>
						<UI.Reveal as={HeroHeroEyebrow}>Контент для рынка недвижимости</UI.Reveal>
						<UI.Reveal as={HeroHeroTitle}>
							Риелтору больше не нужны просто <HeroAccent>Reels</HeroAccent>.<UI.Break />
							Ему нужна система, которая приводит внимание к его имени.
						</UI.Reveal>
						<UI.Reveal as={HeroHeroSub}>
							Стратегия, сценарии, съёмка и монтаж коротких видео для риелторов, агентств и экспертов по недвижимости.
						</UI.Reveal>
						<UI.Reveal as={HeroHeroActions}>
							<UI.LargeGoldLink href={TELEGRAM_CONTACT_URL} target="_blank" rel="noopener noreferrer">Обсудить проект</UI.LargeGoldLink>
							<UI.LargeOutlineLink href="#cases">Посмотреть кейсы</UI.LargeOutlineLink>
						</UI.Reveal>
						<UI.Reveal as={HeroHeroTrust}>
							Работаем с недвижимостью. Создаём контент, который смотрят, сохраняют и обсуждают.
						</UI.Reveal>
					</HeroHeroContent>
					<UI.Reveal as={HeroHeroVisual} id="heroVisual">
						<HeroPhoneMock>
							<HeroPhoneNotch  />
							<HeroPhoneScreen>
								<HeroReelUi>
									<HeroReelBg
										ref={reelVideoRef}
										muted={isReelMuted}
										loop
										playsInline
										preload="metadata"
										poster={reelPoster}
										aria-hidden="true"
										onTimeUpdate={(event) => {
											const { currentTime, duration } = event.currentTarget;
											if (Number.isFinite(duration) && duration > 0) {
												setReelProgress((currentTime / duration) * 100);
											}
										}}
										onSeeked={(event) => {
											const { currentTime, duration } = event.currentTarget;
											if (Number.isFinite(duration) && duration > 0) {
												setReelProgress((currentTime / duration) * 100);
											}
										}}
									>
										<source src={reelVideo} type="video/mp4" />
									</HeroReelBg>
									<HeroReelOverlay />
									<HeroReelPreview src={reelPoster} alt="" $visible={showReelPreview} />
									<HeroReelTop><HeroReelTag>Reels</HeroReelTag></HeroReelTop>
									<HeroReelSide>
										<HeroReelStat>
											<HeroReelIcon>
												<HeroReelIconSvg viewBox="0 0 24 24"><UI.Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></HeroReelIconSvg>
											</HeroReelIcon>
											<HeroReelCount>158 тыс.</HeroReelCount>
										</HeroReelStat>
										<HeroReelStat>
											<HeroReelIcon>
												<HeroReelIconSvg viewBox="0 0 24 24"><UI.Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></HeroReelIconSvg>
											</HeroReelIcon>
											<HeroReelCount>13 тыс.</HeroReelCount>
										</HeroReelStat>
										<HeroReelStat>
											<HeroReelIcon>
												<HeroReelIconSvg viewBox="0 0 24 24"><UI.Line x1="22" y1="2" x2="11" y2="13" /><UI.Polygon points="22 2 15 22 11 13 2 9 22 2" /></HeroReelIconSvg>
											</HeroReelIcon>
											<HeroReelCount>161 тыс.</HeroReelCount>
										</HeroReelStat>
									</HeroReelSide>
									{/*
									<HeroReelBottom>
										<HeroReelUser>
											<HeroReelAvatar />
											<HeroReelName>realestate.expert</HeroReelName>
										</HeroReelUser>
										<HeroReelText>Как риелтору получать 100+ заявок в месяц через короткие видео</HeroReelText>
									</HeroReelBottom>
									*/}
									<HeroReelPlaybackButton
										type="button"
										onClick={() => setIsReelPlaying((playing) => !playing)}
										aria-label={isReelPlaying ? "Поставить видео на паузу" : "Воспроизвести видео"}
									>
										<HeroReelSoundIcon viewBox="0 0 24 24" aria-hidden="true">
											{isReelPlaying ? (
												<>
													<UI.Line x1="8" y1="5" x2="8" y2="19" />
													<UI.Line x1="16" y1="5" x2="16" y2="19" />
												</>
											) : (
												<UI.Polygon points="7 4 20 12 7 20 7 4" />
											)}
										</HeroReelSoundIcon>
									</HeroReelPlaybackButton>
									<HeroReelSoundButton
										type="button"
										disabled={!isReelStarted}
										onClick={() => setIsReelMuted((muted) => !muted)}
										aria-label={isReelMuted ? "Включить звук" : "Выключить звук"}
										title={!isReelStarted ? "Звук станет доступен после запуска видео" : isReelMuted ? "Включить звук" : "Выключить звук"}
									>
										<HeroReelSoundIcon viewBox="0 0 24 24" aria-hidden="true">
											<UI.Path d="M11 5 6 9H3v6h3l5 4V5Z" />
											{isReelMuted ? (
												<>
													<UI.Line x1="17" y1="9" x2="22" y2="15" />
													<UI.Line x1="22" y1="9" x2="17" y2="15" />
												</>
											) : (
												<>
													<UI.Path d="M15.5 8.5a5 5 0 0 1 0 7" />
													<UI.Path d="M18.5 5.5a9 9 0 0 1 0 13" />
												</>
											)}
										</HeroReelSoundIcon>
									</HeroReelSoundButton>
									<HeroReelProgress $progress={reelProgress} />
								</HeroReelUi>
							</HeroPhoneScreen>
						</HeroPhoneMock>
						<HeroHeroFloat1>
							<HeroFloatLabel>Просмотры</HeroFloatLabel>
							<HeroFloatValue>10<HeroAccent> млн+</HeroAccent></HeroFloatValue>
						</HeroHeroFloat1>
						<HeroHeroFloat2>
							<HeroFloatLabel>Подписчики</HeroFloatLabel>
							<HeroFloatValue>31,1<HeroAccent> тыс.</HeroAccent></HeroFloatValue>
						</HeroHeroFloat2>
					</UI.Reveal>
				</HeroHeroGrid>
			</UI.Container>
		</HeroSection>
	);
}
