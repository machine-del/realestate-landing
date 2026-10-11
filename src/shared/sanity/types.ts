export interface CaseStudyDocument {
	_id: string;
	slug?: string;
	title: string;
	clientName?: string;
	category: string;
	task?: string;
	metricValue: string;
	metricLabel: string;
	growthFrom: string;
	growthTo: string;
	description: string;
	initialSituation?: string;
	strategy?: string;
	workDone?: string;
	conclusion?: string;
	details?: string;
	resultStats?: Array<{ label: string; value: string }>;
	thumbnailUrl?: string;
	contentExamples?: Array<{ title: string; url: string; imageUrl?: string }>;
	statisticsScreenshots?: string[];
	testimonial?: string;
	testimonialAuthor?: string;
	order: number;
}
