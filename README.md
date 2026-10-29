# CONTENT PORT website

## Static generation

`npm run build` type-checks and builds the Vite app, then reads published case studies from the configured Sanity dataset and generates:

- A pre-rendered landing page with published case cards.
- One HTML page per published case at `dist/cases/<slug>/index.html`, including canonical, Open Graph, Twitter, and Article metadata.
- A sitemap containing the landing page and every generated case.

The default public Sanity project and dataset are used when `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` are not set. The canonical site URL defaults to `https://realestate-landing-cyan-gamma.vercel.app`; set `VITE_SITE_URL` to another production origin before deployment so generated canonical links, structured data, `robots.txt`, and sitemap use that domain.

The landing page title and description are maintained in `src/shared/seo.ts` and included in the prerendered HTML. After deployment, verify the canonical domain and sitemap in Google Search Console and Yandex Webmaster, then request indexing. Accurate metadata and structured data help search engines understand the site but cannot guarantee a particular ranking.

### Rebuild when Sanity content changes

Static pages update at build time. To publish new case pages automatically:

1. In Vercel, create a Deploy Hook for the production branch.
2. In Sanity Studio's project settings, create a webhook for the production dataset that sends `POST` requests to that Deploy Hook URL.
3. Filter the webhook to published `caseStudy` documents and enable create, update, and delete events.

Keep the Deploy Hook URL private. Each successful deployment rebuilds the case pages and sitemap from the current published dataset.
