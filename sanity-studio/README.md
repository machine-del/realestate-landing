# VERTEX case-study CMS

This separate Sanity Studio manages the case studies shown on the VERTEX landing page. It connects to project `j2snaqzy` and the `production` dataset.

## Run locally

From the repository root, start the landing page and Studio in separate terminals:

```sh
npm run dev
npm run studio
```

Open the Studio URL printed in the terminal (usually `http://localhost:3333`) and sign in with an account authorized for the project.

## Publish a case

Create a **Кейс** and fill in its title, slug, category, main metric and label, before/after results, short description, and display order. The optional **Подробности кейса** field appears in the modal opened by **Подробнее о кейсе**. Publish the document to show it on the website; drafts remain hidden.

## Deploy Studio

```sh
npm run studio:build
npm run studio:deploy
```

The landing page reads the public `production` dataset. It keeps the DIAMOND METERS example visible if no published cases exist or Sanity is unavailable.
