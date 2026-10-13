import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { TELEGRAM_CONTACT_URL } from "../../shared/telegram";

const FooterContent = styled(UI.Footer)`
	padding: 60px 0 40px;
	border-top: 1px solid var(--border);
`;

const FooterGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 40px;
	margin-bottom: 48px;

	@media (min-width: 768px) {
		grid-template-columns: 2fr 1fr;
		gap: 60px;
	}
`;

const FooterBrand = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const FooterLogo = styled(UI.Anchor)`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 16px;
	color: var(--text);
	font-size: 20px;
	font-weight: 800;
	letter-spacing: -0.02em;
	text-decoration: none;
`;

const FooterBrandText = styled(UI.Paragraph)`
	max-width: 300px;
	color: var(--text-muted);
	font-size: 14px;
	font-weight: 300;
	line-height: 1.6;
`;

const FooterColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const FooterColumnTitle = styled(UI.H4)`
	margin-bottom: 20px;
	color: var(--text-dim);
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.08em;
	text-transform: uppercase;
`;

const FooterLink = styled(UI.Anchor)`
	display: block;
	padding: 8px 0;
	color: var(--text-muted);
	font-size: 14px;
	text-decoration: none;
	transition: color 0.3s;

	&:hover {
		color: var(--gold);
	}
`;

const SocialNotice = styled(UI.Paragraph)`
	max-width: 340px;
	margin-top: 12px;
	color: var(--text-dim);
	font-size: 11px;
	line-height: 1.6;
`;

const FooterBottom = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding-top: 32px;
	border-top: 1px solid var(--border);
	color: var(--text-dim);
	font-size: 13px;
`;

export function Footer({
	homeHref = "#",
}: {
	homeHref?: string;
}) {
	return (
		<>
			<FooterContent>
				<UI.Container>
					<FooterGrid>
						<FooterBrand>
							<FooterLogo href={homeHref}>VERTEX</FooterLogo>
							<FooterBrandText>Контент и маркетинг для рынка недвижимости.</FooterBrandText>
						</FooterBrand>
						<FooterColumn>
							<FooterColumnTitle>Связь</FooterColumnTitle>
							<FooterLink href={TELEGRAM_CONTACT_URL} target="_blank" rel="noopener noreferrer">Telegram</FooterLink>
							<FooterLink href="https://instagram.com/and_chernenko?dlrf=b2JuNXZnMTNiaHYy&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram*</FooterLink>
							<FooterLink href="https://wa.me/79082495017" target="_blank" rel="noopener noreferrer">WhatsApp*</FooterLink>
							<SocialNotice>
								Доступность Telegram в России может быть ограничена. *Instagram и WhatsApp принадлежат
								Meta Platforms Inc., признанной в России экстремистской организацией, деятельность
								которой запрещена на территории РФ.
							</SocialNotice>
						</FooterColumn>
					</FooterGrid>
					<FooterBottom>
						<UI.Span>© 2026 VERTEX. Все права защищены.</UI.Span>
						<UI.Span>Контент и маркетинг для рынка недвижимости.</UI.Span>
					</FooterBottom>
				</UI.Container>
			</FooterContent>
		</>
	);
}
