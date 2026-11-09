---
type: frontend-architecture
title: Frontend Rendering and Routes
description: How the Next.js App Router resolves public URLs and loads CMS content, redirects, metadata, and preview state.
tags: [nextjs, routes, rendering]
verified:
  - by: openwiki/0.9.0
    at: 2026-11-09T13:54:46.477Z
sources:
  - id: openwiki-source-cf49497e0a911768f33593dd
    resource: repo://src/app/(frontend)/%5B...legacy%5D/page.tsx
  - id: openwiki-source-cb49e3c4d1015b8673e71275
    resource: repo://src/app/(frontend)/%5Bslug%5D/page.tsx
  - id: openwiki-source-7a2845694b67f1018000b585
    resource: repo://src/app/(frontend)/layout.tsx
  - id: openwiki-source-91c6b8773d2f3b3db92c3bc5
    resource: repo://src/app/(frontend)/next/preview/route.ts
  - id: openwiki-source-08714a3a205535baec68935e
    resource: repo://src/app/(frontend)/posts/%5Bslug%5D/page.tsx
  - id: openwiki-source-c8266e8e23f965cc530933ce
    resource: repo://src/components/PayloadRedirects/index.tsx
generated: { by: "pi", at: "2026-11-09T13:54:46.477Z" }
---

## Route model

The frontend App Router is dynamic (`force-dynamic`) where content must reflect Payload data. The root route builds the news homepage from published posts and categories. The single-segment `[slug]` route first looks up a Page by slug; the `home` slug falls back to static seed data when absent, and any other unmatched page delegates to the post renderer. The legacy `/posts/[slug]` route permanently redirects to the current single-segment post URL.

The catch-all legacy route handles WordPress-like paths by removing a final `.html` extension, looking up a published post using the final path segment, and redirecting on a match. If it cannot resolve a post, it delegates to Payload-managed redirects and ultimately the Next not-found path.

## Content, metadata, and redirects

The dynamic page route enables draft data and Payload access override only in Next draft mode, then renders the selected page hero and layout blocks. Its metadata resolves from the page when found or from the post metadata loader otherwise. The post renderer retrieves posts at relation depth two so it can render taxonomy, media, authors, products, content, and related posts.

`PayloadRedirects` resolves a cached redirect by its source URL. It permanently redirects to either a direct URL or a referenced document's slug; callers can set `disableNotFound` to keep rendering a valid document after checking redirects. This lets page and post views honor redirects even when the current source URL still resolves.

## Shared shell and preview

The root layout sets Spanish document language, font variables, global Header and Footer, providers, metadata defaults, and the Payload admin bar. Production builds additionally load GA4 and AdSense with Next's `lazyOnload` strategy.

The preview route requires the configured preview secret, a relative target path, and successful Payload authentication from the request. It enables Next draft mode only for that authenticated request and redirects to the requested route; all rejected validation or authentication paths return an error response without enabling preview.

## Related pages

- [CMS and Content Architecture](../architecture/cms-and-content.md) documents the records and hooks queried by these routes.
- [Editorial Components](editorial-components.md) explains the page, post, block, and rich-text renderers.
