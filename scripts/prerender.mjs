import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createClient } from "@sanity/client";
import { createServer, loadEnv } from "vite";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputDirectory = path.join(root, "dist");
const env = loadEnv("production", root, "");
const siteUrl = (env.VITE_SITE_URL || "https://realestate-landing-cyan-gamma.vercel.app").replace(/\/+$/, "");
const client = createClient({
	projectId: env.VITE_SANITY_PROJECT_ID || "j2snaqzy",
	dataset: env.VITE_SANITY_DATASET || "production",
	apiVersion: "2025-02-19",
	useCdn: false,
});

function escapeHtml(value = "") {
	return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function replaceMeta(html, selector, replacement) {
	const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const pattern = new RegExp(`<meta\\s+${escapedSelector}[^>]*>`, "i");
	return pattern.test(html) ? html.replace(pattern, () => replacement) : html.replace("</head>", `    ${replacement}\n  </head>`);
}

function updateMetadata(template, { title, description, canonical, image, type }) {
	let html = template.replace(/<title>.*?<\/title>/i, () => `<title>${escapeHtml(title)}</title>`);
	html = replaceMeta(html, 'name="description"', `<meta name="description" content="${escapeHtml(description)}" />`);
	html = replaceMeta(html, 'property="og:type"', `<meta property="og:type" content="${type}" />`);
	html = replaceMeta(html, 'property="og:url"', `<meta property="og:url" content="${escapeHtml(canonical)}" />`);
	html = replaceMeta(html, 'property="og:title"', `<meta property="og:title" content="${escapeHtml(title)}" />`);
	html = replaceMeta(html, 'property="og:description"', `<meta property="og:description" content="${escapeHtml(description)}" />`);
	html = replaceMeta(html, 'name="twitter:card"', `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />`);
	html = replaceMeta(html, 'name="twitter:title"', `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
	html = replaceMeta(html, 'name="twitter:description"', `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
	if (image) {
		html = replaceMeta(html, 'property="og:image"', `<meta property="og:image" content="${escapeHtml(image)}" />`);
		html = replaceMeta(html, 'name="twitter:image"', `<meta name="twitter:image" content="${escapeHtml(image)}" />`);
	} else {
		html = html.replace(/\s*<meta\s+(?:property="og:image"|name="twitter:image")[^>]*>/gi, "");
	}

	const canonicalTag = `<link rel="canonical" href="${escapeHtml(canonical)}" />`;
	html = /<link\s+rel="canonical"[^>]*>/i.test(html)
		? html.replace(/<link\s+rel="canonical"[^>]*>/i, canonicalTag)
		: html.replace("</head>", `    ${canonicalTag}\n  </head>`);
	return html;
}

function serializeSiteData(data) {
	return JSON.stringify(data).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");
}

try {
	const vite = await createServer({
		root,
		configFile: path.join(root, "vite.config.ts"),
		server: { middlewareMode: true },
		appType: "custom",
		logLevel: "error",
	});

	try {
		const [{ App }, { caseStudiesQuery }, { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE }] = await Promise.all([
			vite.ssrLoadModule("/src/app/App.tsx"),
			vite.ssrLoadModule("/src/shared/sanity/caseStudies.ts"),
			vite.ssrLoadModule("/src/shared/seo.ts"),
		]);
		const cases = await client.fetch(caseStudiesQuery);
		const seenSlugs = new Set();
		const builtAssetFiles = await readdir(path.join(outputDirectory, "assets"));
		const template = await readFile(path.join(outputDirectory, "index.html"), "utf8");
		const sitemapEntries = [`  <url><loc>${escapeHtml(`${siteUrl}/`)}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`];
		const organizationId = `${siteUrl}/#organization`;
		const organization = {
			"@type": "Organization",
			"@id": organizationId,
			name: SITE_NAME,
			url: `${siteUrl}/`,
			description: SITE_DESCRIPTION,
			sameAs: [
				"https://instagram.com/and_chernenko?dlrf=b2JuNXZnMTNiaHYy&utm_source=qr",
				"https://t.me/menportal_g",
			],
		};
		const pages = [
			{
				pathname: "/",
				outputPath: path.join(outputDirectory, "index.html"),
				title: SITE_TITLE,
				description: SITE_DESCRIPTION,
				data: { caseStudies: cases },
				type: "website",
				jsonLd: {
					"@context": "https://schema.org",
					"@graph": [
						organization,
						{
							"@type": "WebSite",
							"@id": `${siteUrl}/#website`,
							url: `${siteUrl}/`,
							name: SITE_NAME,
							inLanguage: "ru-RU",
							publisher: { "@id": organizationId },
						},
					],
				},
			},
		];

		for (const item of cases) {
			if (!item.slug || !/^[\p{L}\p{N}-]+$/u.test(item.slug)) {
				throw new Error(`Invalid or missing slug for case "${item._id}".`);
			}
			if (seenSlugs.has(item.slug)) {
				throw new Error(`Duplicate slug "${item.slug}" found in published case studies.`);
			}
			seenSlugs.add(item.slug);
			const description = (item.task || item.description || "Результаты и подробности проекта CONTENT PORT.").slice(0, 160);
			const canonical = `${siteUrl}/cases/${encodeURIComponent(item.slug)}/`;
			const title = `${item.title} — кейс CONTENT PORT`;
			const jsonLd = {
				"@context": "https://schema.org",
				"@graph": [
					organization,
					{
						"@type": "Article",
						"@id": `${canonical}#article`,
						headline: item.title,
						description,
						mainEntityOfPage: canonical,
						...(item.thumbnailUrl ? { image: item.thumbnailUrl } : {}),
						publisher: { "@id": organizationId },
					},
				],
			};
			pages.push({
				pathname: `/cases/${item.slug}/`,
				outputPath: path.join(outputDirectory, "cases", item.slug, "index.html"),
				title,
				description,
				canonical,
				image: item.thumbnailUrl,
				type: "article",
				data: { caseStudy: item },
				jsonLd,
			});
			sitemapEntries.push(`  <url><loc>${escapeHtml(canonical)}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
		}

		for (const page of pages) {
			const markup = renderToString(createElement(App, {
				pathname: page.pathname,
				initialCaseStudies: page.data.caseStudies,
				initialCase: page.data.caseStudy,
			}));
			let html = updateMetadata(template, {
				title: page.title,
				description: page.description,
				canonical: page.canonical || `${siteUrl}/`,
				image: page.image,
				type: page.type,
			});
			html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
			html = html.replace(/\/assets\/(?:images|videos)\/[^"')\s]+/g, (assetUrl) => {
				const sourceName = path.posix.basename(assetUrl);
				const extension = path.posix.extname(sourceName);
				const sourceStem = sourceName.slice(0, -extension.length).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
				const builtAsset = builtAssetFiles.find((file) => file === sourceName || new RegExp(`^${sourceStem}-.*${extension.replace(".", "\\.")}$`).test(file));
				if (!builtAsset) {
					throw new Error(`Could not map prerendered asset "${assetUrl}" to a built asset.`);
				}
				return `/assets/${builtAsset}`;
			});
			if (page.jsonLd) {
				const jsonLdScript = `<script type="application/ld+json">${serializeSiteData(page.jsonLd)}</script>`;
				html = /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i.test(html)
					? html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, jsonLdScript)
					: html.replace("</head>", `    ${jsonLdScript}\n  </head>`);
			}
			html = html.replace("</head>", `    <script>window.__SITE_DATA__=${serializeSiteData(page.data)}</script>\n  </head>`);
			await mkdir(path.dirname(page.outputPath), { recursive: true });
			await writeFile(page.outputPath, html);
			console.log(`Prerendered ${page.pathname}`);
		}

		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join("\n")}\n</urlset>\n`;
		await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap);
		await writeFile(path.join(outputDirectory, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
		console.log(`Generated sitemap with ${pages.length} URLs.`);
	} finally {
		await vite.close();
	}
} catch (error) {
	console.error("Static generation failed. Ensure the published Sanity dataset is reachable and every case has a valid slug.", error);
	process.exitCode = 1;
}
