import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { TELEGRAM_CONTACT_URL } from "../../shared/telegram";

const NavigationBar = styled.header<{ $scrolled: boolean }>`
	position: fixed;
	z-index: 100;
	top: 0;
	right: 0;
	left: 0;
	padding: 18px 0;
	border-bottom: 1px solid ${({ $scrolled }) => ($scrolled ? "var(--border)" : "transparent")};
	background: ${({ $scrolled }) => ($scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent")};
	backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(20px)" : "none")};
	transition: background 0.4s var(--ease), backdrop-filter 0.4s, border-color 0.4s;
`;

const SkipLink = styled(UI.Anchor)`
	position: absolute;
	top: -64px;
	left: 12px;
	z-index: 101;
	padding: 10px 16px;
	border-radius: var(--radius-sm);
	background: var(--gold);
	color: #0a0a0a;
	font-weight: 600;
	text-decoration: none;

	&:focus {
		top: 12px;
	}
`;

const NavInner = styled(UI.Container)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	@media (min-width: 768px) {
		gap: 24px;
	}
`;

const Logo = styled(UI.Anchor)`
	display: flex;
	align-items: center;
	gap: 8px;
	color: var(--text);
	font-size: 30px;
	font-weight: 800;
	letter-spacing: -0.02em;
	text-decoration: none;

	@media (max-width: 480px) {
		font-size: 20px;
	}
`;

const NavLinks = styled.nav`
	display: none;
	align-items: center;
	gap: 32px;

	@media (min-width: 1024px) {
		display: flex;
	}
`;

const NavLink = styled(UI.Anchor)`
	color: var(--text-muted);
	font-size: 14px;
	font-weight: 400;
	text-decoration: none;
	transition: color 0.3s;

	&:hover {
		color: var(--text);
	}
`;

const NavCta = styled(UI.SmallGoldLink)`
	display: inline-flex;
	padding: 9px 11px;
	font-size: 11px;

	@media (min-width: 768px) {
		display: inline-flex;
		padding: 10px 20px;
		font-size: 14px;
	}
`;

const Burger = styled(UI.Button)`
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 8px;
	border: none;
	background: none;
	cursor: pointer;

	@media (min-width: 1024px) {
		display: none;
	}

`;

const BurgerLine = styled(UI.Span)<{ $active: boolean; $index: number }>`
	display: block;
	width: 22px;
	height: 1.5px;
	transform: ${({ $active, $index }) => {
		if (!$active) return "none";
		if ($index === 0) return "translateY(6.5px) rotate(45deg)";
		if ($index === 2) return "translateY(-6.5px) rotate(-45deg)";
		return "none";
	}};
	opacity: ${({ $active, $index }) => ($active && $index === 1 ? 0 : 1)};
	background: var(--text);
	transition: all 0.3s var(--ease);
`;

const MobileMenu = styled.div<{ $open: boolean }>`
	position: fixed;
	z-index: 99;
	inset: 0;
	display: flex;
	flex-direction: column;
	gap: 8px;
	overflow-y: auto;
	padding: 100px 24px 40px;
	transform: translateY(${({ $open }) => ($open ? "0" : "-100%")});
	visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
	background: var(--bg);
	transition: transform 0.5s var(--ease), visibility 0s linear ${({ $open }) => ($open ? "0s" : "0.5s")};
`;

const MobileNavLink = styled(UI.Anchor)`
	padding: 12px 0;
	border-bottom: 1px solid var(--border);
	color: var(--text);
	font-size: 28px;
	font-weight: 600;
	letter-spacing: -0.02em;
	text-decoration: none;

	&:nth-last-of-type(2) {
		border-bottom: none;
	}
`;

const links = [
	["Результаты", "#results"],
	["Подход", "#approach"],
	["Услуги", "#services"],
	["Кейсы", "#cases"],
	["FAQ", "#faq"],
];

export function Navigation() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const burgerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		if (menuOpen) {
			document.querySelector<HTMLAnchorElement>("#mobile-navigation a")?.focus();
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	return (
		<>
			<SkipLink href="#main-content">Перейти к содержимому</SkipLink>
			<NavigationBar $scrolled={scrolled}>
				<NavInner>
					<Logo href="#">CONTENT PORT</Logo>
					<NavLinks aria-label="Основная навигация">
						{links.map(([label, href]) => <NavLink href={href} key={href}>{label}</NavLink>)}
					</NavLinks>
					<NavCta href={TELEGRAM_CONTACT_URL} target="_blank" rel="noopener noreferrer">Обсудить проект</NavCta>
					<Burger
						ref={burgerRef}
						type="button"
						aria-label={menuOpen ? "Закрыть меню" : "Меню"}
						aria-expanded={menuOpen}
						aria-controls="mobile-navigation"
						onClick={() => setMenuOpen((open) => !open)}
						onKeyDown={(event) => {
							if (event.key === "Escape" && menuOpen) {
								setMenuOpen(false);
								burgerRef.current?.focus();
							}
						}}
					>
						<BurgerLine $active={menuOpen} $index={0} />
						<BurgerLine $active={menuOpen} $index={1} />
						<BurgerLine $active={menuOpen} $index={2} />
					</Burger>
				</NavInner>
			</NavigationBar>
			<MobileMenu
				as="nav"
				id="mobile-navigation"
				$open={menuOpen}
				aria-label="Мобильная навигация"
				aria-hidden={!menuOpen}
				onKeyDown={(event) => {
					if (event.key === "Escape") {
						setMenuOpen(false);
						burgerRef.current?.focus();
						return;
					}
					if (event.key !== "Tab") return;

					const menuLinks = event.currentTarget.querySelectorAll<HTMLAnchorElement>("a");
					const firstLink = menuLinks[0];
					const lastLink = menuLinks[menuLinks.length - 1];
					if (event.shiftKey && document.activeElement === firstLink) {
						event.preventDefault();
						lastLink?.focus();
					} else if (!event.shiftKey && document.activeElement === lastLink) {
						event.preventDefault();
						firstLink?.focus();
					}
				}}
			>
				{links.map(([label, href]) => (
					<MobileNavLink
						href={href}
						key={href}
						tabIndex={menuOpen ? 0 : -1}
						onClick={() => {
							setMenuOpen(false);
							burgerRef.current?.focus();
						}}
					>
						{label}
					</MobileNavLink>
				))}
			</MobileMenu>
		</>
	);
}
