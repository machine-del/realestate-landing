import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "j2snaqzy";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion: "2025-02-19",
	useCdn: false,
});
