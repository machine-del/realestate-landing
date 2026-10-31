import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { sanityClient } from "../../shared/sanity/client";
import { heroSliderQuery, type HeroSliderImage } from "../../shared/sanity/heroSlider";
import firstImage from "../../../assets/images/slider/5341358970582538725.jpg";
import secondImage from "../../../assets/images/slider/5381828682181189511.jpg";
import thirdImage from "../../../assets/images/slider/5381828682181189512.jpg";

const fallbackSlides: HeroSliderImage[] = [
	{ url: firstImage, alt: "Пример работы 1" },
	{ url: secondImage, alt: "Пример работы 2" },
	{ url: thirdImage, alt: "Пример работы 3" },
];

const SliderSection = styled.section`
	padding: 28px 0 80px;

	@media (min-width: 768px) {
		padding: 48px 0 112px;
	}
`;

const SectionHeading = styled.div`
	margin-bottom: 24px;
	text-align: center;

	@media (min-width: 768px) {
		margin-bottom: 32px;
	}
`;

const SectionEyebrow = styled.p`
	margin-bottom: 10px;
	color: var(--gold);
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.16em;
	text-transform: uppercase;
`;

const SectionTitle = styled.h2`
	color: var(--text);
	font-size: clamp(24px, 4vw, 38px);
	font-weight: 700;
	letter-spacing: -0.04em;
	line-height: 1.12;
`;

const SliderFrame = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	height: clamp(400px, 56vw, 680px);
	overflow: hidden;
	border: 1px solid var(--border);
	border-radius: 24px;
	background: #080808;

	@media (max-width: 600px) {
		height: min(72svh, 560px);
		min-height: 320px;
		border-radius: 14px;
	}
`;

const CarouselViewport = styled.div`
	position: relative;
	z-index: 1;
	min-height: 0;
	flex: 1;
	overflow: hidden;
	touch-action: pan-y;
`;

const SlideButton = styled.button<{ $position: "previous" | "active" | "next" }>`
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: ${({ $position }) => ($position === "active" ? 2 : 1)};
	display: grid;
	width: min(58%, 760px);
	height: calc(100% - 32px);
	place-items: center;
	padding: 12px;
	transform: ${({ $position }) => {
		if ($position === "previous") return "translate(-50%, -50%) translateX(-76%) scale(0.88)";
		if ($position === "next") return "translate(-50%, -50%) translateX(76%) scale(0.88)";
		return "translate(-50%, -50%) scale(1)";
	}};
	border: 0;
	border-radius: 16px;
	background: ${({ $position }) => ($position === "active" ? "#080808" : "transparent")};
	box-shadow: ${({ $position }) => ($position === "active" ? "0 20px 56px rgba(0, 0, 0, 0.42)" : "none")};
	cursor: ${({ $position }) => ($position === "active" ? "zoom-in" : "pointer")};
	opacity: ${({ $position }) => ($position === "active" ? 1 : 0.66)};
	transition: transform 450ms var(--ease), opacity 450ms var(--ease), background 450ms var(--ease), box-shadow 450ms var(--ease);

	&:hover {
		opacity: ${({ $position }) => ($position === "active" ? 1 : 0.88)};
	}

	&:focus-visible {
		outline: 2px solid var(--gold);
		outline-offset: -2px;
	}

	@media (max-width: 600px) {
		width: 62%;
		height: calc(100% - 24px);
		padding: 8px;
		border-radius: 10px;
		transform: ${({ $position }) => {
			if ($position === "previous") return "translate(-50%, -50%) translateX(-78%) scale(0.86)";
			if ($position === "next") return "translate(-50%, -50%) translateX(78%) scale(0.86)";
			return "translate(-50%, -50%) scale(1)";
		}};
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;

const SlideImage = styled.img`
	display: block;
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: min(calc(68svh - 24px), 620px);
	object-fit: contain;
	animation: slide-enter 420ms ease both;

	@media (max-width: 600px) {
		max-height: min(calc(68svh - 24px), 480px);
	}

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}

	@keyframes slide-enter {
		from {
			opacity: 0.65;
			transform: scale(0.99);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
`;

const ControlButton = styled.button`
	display: inline-flex;
	flex: 0 0 38px;
	width: 38px;
	height: 38px;
	box-sizing: border-box;
	align-items: center;
	justify-content: center;
	padding: 0;
	border: 1px solid transparent;
	border-radius: var(--radius-pill);
	background: transparent;
	color: var(--text);
	cursor: pointer;
	line-height: 0;
	transition: background 160ms ease, color 160ms ease;

	&:hover,
	&:focus-visible {
		background: var(--gold-soft);
		color: var(--gold);
	}
`;

const ControlIcon = styled.svg`
	display: block;
	width: 18px;
	height: 18px;
	flex: 0 0 18px;
	overflow: visible;
	fill: none;
	stroke: currentColor;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-width: 1.8;
`;

const FullscreenOverlay = styled.div`
	position: fixed;
	inset: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 64px 16px 76px;
	background: rgba(8, 8, 9, 0.98);

	@media (min-width: 768px) {
		padding: 72px 48px 88px;
	}
`;

const FullscreenImage = styled.img`
	display: block;
	max-width: calc(100vw - 32px);
	max-height: calc(100dvh - 148px);
	object-fit: contain;
	border-radius: 8px;
	box-shadow: 0 24px 90px rgba(0, 0, 0, 0.55);
`;

const FullscreenClose = styled(ControlButton)`
	position: absolute;
	top: 18px;
	right: 18px;
	z-index: 1;
	border-color: rgba(255, 255, 255, 0.16);
	background: rgba(255, 255, 255, 0.08);

	@media (min-width: 768px) {
		top: 24px;
		right: 24px;
	}
`;

const FullscreenControls = styled(ControlButton)`
	border-color: rgba(255, 255, 255, 0.16);
	background: rgba(255, 255, 255, 0.08);
`;

const SlideCount = styled.span`
	min-width: 48px;
	color: var(--text);
	font-size: 13px;
	text-align: center;
	font-variant-numeric: tabular-nums;
`;

const FullscreenControlsBar = styled.div`
	position: absolute;
	bottom: 20px;
	left: 50%;
	z-index: 2;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 7px;
	transform: translateX(-50%);
	border: 1px solid rgba(255, 255, 255, 0.14);
	border-radius: var(--radius-pill);
	background: rgba(24, 24, 25, 0.86);
	backdrop-filter: blur(14px);

	@media (min-width: 768px) {
		bottom: 24px;
	}
`;

export function HeroSlider({ initialSlides }: { initialSlides?: HeroSliderImage[] }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [slides, setSlides] = useState(
		initialSlides?.length ? initialSlides : fallbackSlides,
	);
	const slideButtonRef = useRef<HTMLButtonElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		let active = true;
		sanityClient
			.fetch<HeroSliderImage[] | null>(heroSliderQuery)
			.then((images) => {
				if (active && images?.length) setSlides(images);
			})
			.catch((error: unknown) => {
				console.error("Could not load published slider images from Sanity.", error);
			});

		return () => {
			active = false;
		};
	}, []);

	useEffect(() => {
		setActiveIndex((index) => (index < slides.length ? index : 0));
	}, [slides.length]);

	useEffect(() => {
		const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
		setIsPaused(motionPreference.matches);
		const onMotionPreferenceChange = (event: MediaQueryListEvent) => setIsPaused(event.matches);
		motionPreference.addEventListener("change", onMotionPreferenceChange);
		return () => motionPreference.removeEventListener("change", onMotionPreferenceChange);
	}, []);

	useEffect(() => {
		if (isFullscreen || isPaused || slides.length < 2) return;
		const interval = window.setInterval(() => {
			setActiveIndex((index) => (index + 1) % slides.length);
		}, 3000);

		return () => window.clearInterval(interval);
	}, [isFullscreen, isPaused, slides.length]);

	useEffect(() => {
		if (!isFullscreen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		closeButtonRef.current?.focus();

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsFullscreen(false);
			if (event.key === "ArrowLeft") {
				setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
			}
			if (event.key === "ArrowRight") {
				setActiveIndex((index) => (index + 1) % slides.length);
			}
		};
		window.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", onKeyDown);
			slideButtonRef.current?.focus();
		};
	}, [isFullscreen, slides.length]);

	const trapDialogFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
		if (event.key !== "Tab") return;
		const focusableElements = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];
		if (!firstElement || !lastElement) return;

		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	};

	const goTo = (offset: number) => {
		setActiveIndex((index) => (index + offset + slides.length) % slides.length);
	};

	return (
		<SliderSection role="region" aria-label="Примеры работ" aria-roledescription="слайдер">
			<UI.Container>
				<SectionHeading>
					<SectionEyebrow>Реальные результаты</SectionEyebrow>
					<SectionTitle>Цифры, за которыми стоит работа</SectionTitle>
				</SectionHeading>
				<SliderFrame>
					<CarouselViewport aria-live={isPaused ? "polite" : "off"}>
						{([-1, 0, 1] as const).map((offset) => {
							const index = (activeIndex + offset + slides.length) % slides.length;
							const position = offset === -1 ? "previous" : offset === 1 ? "next" : "active";
							return (
								<SlideButton
									key={`${index}-${slides[index].url}`}
									ref={position === "active" ? slideButtonRef : undefined}
									type="button"
									$position={position}
									onClick={() => {
										if (position === "active") setIsFullscreen(true);
										else setActiveIndex(index);
									}}
									aria-label={
										position === "active"
											? `Открыть изображение ${index + 1} на весь экран`
											: `Показать изображение ${index + 1}`
									}
									tabIndex={position === "active" ? 0 : -1}
								>
									<SlideImage
										src={slides[index].url}
										alt={slides[index].alt || `Пример работы ${index + 1}`}
									/>
								</SlideButton>
							);
						})}
					</CarouselViewport>
				</SliderFrame>
			</UI.Container>
			{isFullscreen && (
				<FullscreenOverlay
					role="dialog"
					aria-modal="true"
					aria-label={`Просмотр изображения ${activeIndex + 1}`}
					onKeyDown={trapDialogFocus}
					onClick={(event) => {
						if (event.target === event.currentTarget) setIsFullscreen(false);
					}}
				>
					<FullscreenClose ref={closeButtonRef} type="button" onClick={() => setIsFullscreen(false)} aria-label="Закрыть просмотр">
						<ControlIcon viewBox="0 0 24 24" aria-hidden="true">
							<path d="m6 6 12 12M18 6 6 18" />
						</ControlIcon>
					</FullscreenClose>
					<FullscreenImage
						key={slides[activeIndex].url}
						src={slides[activeIndex].url}
						alt={slides[activeIndex].alt || `Пример работы ${activeIndex + 1}`}
					/>
					<FullscreenControlsBar>
						<FullscreenControls type="button" onClick={() => goTo(-1)} aria-label="Предыдущее изображение">
							<ControlIcon viewBox="0 0 24 24" aria-hidden="true">
								<path d="M19 12H5m0 0 6 6m-6-6 6-6" />
							</ControlIcon>
						</FullscreenControls>
						<SlideCount aria-live="polite">{activeIndex + 1} / {slides.length}</SlideCount>
						<FullscreenControls type="button" onClick={() => goTo(1)} aria-label="Следующее изображение">
							<ControlIcon viewBox="0 0 24 24" aria-hidden="true">
								<path d="M5 12h14m0 0-6-6m6 6-6 6" />
							</ControlIcon>
						</FullscreenControls>
					</FullscreenControlsBar>
				</FullscreenOverlay>
			)}
		</SliderSection>
	);
}
