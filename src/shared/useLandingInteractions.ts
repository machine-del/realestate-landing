import { useEffect } from "react";

export function useLandingInteractions() {
	useEffect(() => {
		const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
		const cleanup: Array<() => void> = [];

		const onAnchorClick = (event: Event) => {
			const anchor = event.currentTarget as HTMLAnchorElement;
			const targetId = anchor.hash.slice(1);
			if (!targetId) return;
			const target = document.getElementById(decodeURIComponent(targetId));
			if (!target) return;
			event.preventDefault();
			window.scrollTo({
				top: target.getBoundingClientRect().top + window.scrollY - 80,
				behavior: "smooth",
			});
		};
		anchors.forEach((anchor) => anchor.addEventListener("click", onAnchorClick));

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const pinSections = [
			["problem-pin", "problemInner", "problemProgress"],
			["expert-pin", "expertInner", "expertProgress"],
			["contact", "finalInner", "finalProgress"],
		];

		if (reduceMotion) {
			document.querySelectorAll<HTMLElement>("#problemInner h2 > span, #expertInner h2 > span, #finalInner h2 > span, #finalInner > p, #finalInner > div")
				.forEach((line) => {
					line.style.opacity = "1";
					line.style.transform = "none";
				});
		} else {
			pinSections.forEach(([sectionId, innerId, progressId]) => {
				const section = document.getElementById(sectionId);
				const inner = document.getElementById(innerId);
				const progressBar = document.getElementById(progressId);
				if (!section || !inner) return;

				const lines = Array.from(inner.querySelectorAll<HTMLElement>("h2 > span, h2 + p, h2 + div"));
				let frame: number | null = null;
				let lastProgress = -1;
				const update = () => {
					frame = null;
					const rect = section.getBoundingClientRect();
					const total = rect.height - window.innerHeight;
					let progress = total > 0 ? -rect.top / total : 0;
					progress = Math.max(0, Math.min(1, progress));
					if (Math.abs(progress - lastProgress) < 0.001) return;
					lastProgress = progress;

					const step = 1 / (lines.length + 1);
					lines.forEach((line, index) => {
						const visible = progress > step * (index + 1) * 0.6;
						line.style.opacity = visible ? "1" : "0";
						line.style.transform = visible ? "translateY(0)" : "translateY(30px)";
					});

					const innerProgress = Math.min(1, progress * 1.2);
					const y = (1 - innerProgress) * 40 - progress * 20;
					const scale = 0.96 + innerProgress * 0.04;
					inner.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
					inner.style.opacity = "1";
					if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
				};

				const onPinScroll = () => {
					if (frame !== null) return;
					frame = window.requestAnimationFrame(update);
				};
				window.addEventListener("scroll", onPinScroll, { passive: true });
				window.addEventListener("resize", onPinScroll, { passive: true });
				update();
				cleanup.push(() => {
					window.removeEventListener("scroll", onPinScroll);
					window.removeEventListener("resize", onPinScroll);
					if (frame !== null) window.cancelAnimationFrame(frame);
				});
			});
		}

		const caseSvgs = document.querySelectorAll<SVGSVGElement>("#cases svg");
		let caseObserver: IntersectionObserver | undefined;
		if (caseSvgs.length) {
			caseObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (!entry.isIntersecting) return;
						const paths = entry.target.querySelectorAll<SVGPathElement>("path");
						if (paths[0]) paths[0].style.opacity = "1";
						if (paths[1]) paths[1].style.strokeDashoffset = "0";
						caseObserver?.unobserve(entry.target);
					});
				},
				{ threshold: 0.3 },
			);
			caseSvgs.forEach((svg) => caseObserver?.observe(svg));
			cleanup.push(() => caseObserver?.disconnect());
		}

		const heroVisual = document.getElementById("heroVisual");
		const onHeroParallax = () => {
			if (heroVisual && window.scrollY < window.innerHeight) {
				heroVisual.style.transform = `translateY(${window.scrollY * 0.08}px)`;
			}
		};
		if (heroVisual && window.innerWidth > 1024) {
			window.addEventListener("scroll", onHeroParallax, { passive: true });
			onHeroParallax();
			cleanup.push(() => window.removeEventListener("scroll", onHeroParallax));
		}

		return () => {
			anchors.forEach((anchor) => anchor.removeEventListener("click", onAnchorClick));
			caseObserver?.disconnect();
			cleanup.forEach((dispose) => dispose());
		};
	}, []);
}
