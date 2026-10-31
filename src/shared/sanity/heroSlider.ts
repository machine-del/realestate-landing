export interface HeroSliderImage {
	url: string;
	alt?: string;
}

export const heroSliderQuery = `*[_type == "heroSlider" && _id == "heroSlider" && !(_id in path("drafts.**"))][0]{
	"images": images[defined(asset->url)]{ "url": asset->url, alt }
}.images`;
