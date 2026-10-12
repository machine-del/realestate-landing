import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { TELEGRAM_CONTACT_URL } from "../../shared/telegram";

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
const HeroReelBg = styled(UI.Div)`		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, rgba(201, 169, 106, 0.15) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8) 100%),
			linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%);

		&::after {
			position: absolute;
			inset: 0;
			background-image:
				radial-gradient(circle at 30% 40%, rgba(201, 169, 106, 0.2) 0%, transparent 40%),
				radial-gradient(circle at 70% 70%, rgba(120, 80, 200, 0.15) 0%, transparent 40%);
			content: "";
		}
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
const HeroReelProgress = styled(UI.Div)`		position: absolute;
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
			width: 40%;
			border-radius: 2px;
			background: #fff;
			content: "";
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
const HeroHeroFloat1 = styled(HeroHeroFloatCard)`		top: 10%;
		left: 0;
		animation-delay: 0.5s;
	`;
const HeroHeroFloat2 = styled(HeroHeroFloatCard)`		right: 0;
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
									<HeroReelBg  />
									<HeroReelTop><HeroReelTag>Reels</HeroReelTag></HeroReelTop>
									<HeroReelSide>
										<HeroReelStat>
											<HeroReelIcon>
												<HeroReelIconSvg viewBox="0 0 24 24"><UI.Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></HeroReelIconSvg>
											</HeroReelIcon>
											<HeroReelCount>12.4K</HeroReelCount>
										</HeroReelStat>
										<HeroReelStat>
											<HeroReelIcon>
												<HeroReelIconSvg viewBox="0 0 24 24"><UI.Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></HeroReelIconSvg>
											</HeroReelIcon>
											<HeroReelCount>847</HeroReelCount>
										</HeroReelStat>
										<HeroReelStat>
											<HeroReelIcon>
												<HeroReelIconSvg viewBox="0 0 24 24"><UI.Line x1="22" y1="2" x2="11" y2="13" /><UI.Polygon points="22 2 15 22 11 13 2 9 22 2" /></HeroReelIconSvg>
											</HeroReelIcon>
											<HeroReelCount>2.1K</HeroReelCount>
										</HeroReelStat>
									</HeroReelSide>
									<HeroReelBottom>
										<HeroReelUser>
											<HeroReelAvatar  />
											<HeroReelName>realestate.expert</HeroReelName>
										</HeroReelUser>
										<HeroReelText>Как риелтору получать 100+ заявок в месяц через короткие видео</HeroReelText>
									</HeroReelBottom>
									<HeroReelProgress  />
								</HeroReelUi>
							</HeroPhoneScreen>
						</HeroPhoneMock>
						<HeroHeroFloat1>
							<HeroFloatLabel>Просмотры</HeroFloatLabel>
							<HeroFloatValue>12<HeroAccent>M+</HeroAccent></HeroFloatValue>
						</HeroHeroFloat1>
						<HeroHeroFloat2>
							<HeroFloatLabel>Подписчики</HeroFloatLabel>
							<HeroFloatValue>31<HeroAccent>K+</HeroAccent></HeroFloatValue>
						</HeroHeroFloat2>
					</UI.Reveal>
				</HeroHeroGrid>
			</UI.Container>
		</HeroSection>
	);
}
