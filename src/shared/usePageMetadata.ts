import { useEffect } from "react";

interface PageMetadata {
	title: string;
	description: string;
	image?: string;
	type?: "website" | "article";
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
	let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
	if (!element) {
		element = document.createElement("meta");
		element.setAttribute(attribute, key);
		document.head.append(element);
	}
	element.content = content;
}

export function usePageMetadata({ title, description, image, type = "website" }: PageMetadata) {
	useEffect(() => {
		const siteUrl = (
			import.meta.env.VITE_SITE_URL
			|| "https://realestate-landing-cyan-gamma.vercel.app"
		).replace(/\/+$/, "");
		const canonicalUrl = `${siteUrl}${window.location.pathname}`;
		document.title = title;
		setMeta("name", "description", description);
		setMeta("property", "og:type", type);
		setMeta("property", "og:title", title);
		setMeta("property", "og:description", description);
		setMeta("property", "og:url", canonicalUrl);
		setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
		setMeta("name", "twitter:title", title);
		setMeta("name", "twitter:description", description);

		if (image) {
			setMeta("property", "og:image", image);
			setMeta("name", "twitter:image", image);
		} else {
			document.head.querySelector('meta[property="og:image"]')?.remove();
			document.head.querySelector('meta[name="twitter:image"]')?.remove();
		}

		let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		if (!canonical) {
			canonical = document.createElement("link");
			canonical.rel = "canonical";
			document.head.append(canonical);
		}
		canonical.href = canonicalUrl;
	}, [description, image, title, type]);
}
