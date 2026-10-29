import type { CaseStudyDocument } from "./sanity/types";

export interface SiteData {
	caseStudies?: CaseStudyDocument[];
	caseStudy?: CaseStudyDocument;
}

declare global {
	interface Window {
		__SITE_DATA__?: SiteData;
	}
}

export function getSiteData(): SiteData {
	return typeof window === "undefined" ? {} : window.__SITE_DATA__ ?? {};
}
