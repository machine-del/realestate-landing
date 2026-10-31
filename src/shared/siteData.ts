import type { CaseStudyDocument } from "./sanity/types";
import type { HeroSliderImage } from "./sanity/heroSlider";

export interface SiteData {
	caseStudies?: CaseStudyDocument[];
	caseStudy?: CaseStudyDocument;
	heroSlides?: HeroSliderImage[];
}

declare global {
	interface Window {
		__SITE_DATA__?: SiteData;
	}
}

export function getSiteData(): SiteData {
	return typeof window === "undefined" ? {} : window.__SITE_DATA__ ?? {};
}
