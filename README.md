# Sumeet Urban Nest

Official landing page for Sumeet Urban Nest, built with Next.js and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

## Cloudflare build

Build the Cloudflare Worker locally with:

```bash
npm run cf:build
```

Cloudflare Workers Builds uses `npm run build` to generate both the Next.js
output and the OpenNext Worker. Its preview command is `npx wrangler preview`.
Keep `main` as the production branch so commits to `dev` create previews for
review.
