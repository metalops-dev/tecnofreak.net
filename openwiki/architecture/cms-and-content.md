---
type: architecture
title: CMS and Content Architecture
description: Payload CMS configuration and the content models that drive Tecnofreak's Spanish-language site.
tags: [payload, cms, content]
verified:
  - by: openwiki/0.9.0
    at: 2026-11-09T13:54:46.477Z
sources:
  - id: openwiki-source-ba2e42cc16395d5a3638dd44
    resource: repo://src/access/authenticatedOrPublished.ts
  - id: openwiki-source-e8c612a97688c728a48556db
    resource: repo://src/collections/Comments.ts
  - id: openwiki-source-d58a4d3cf178bb2fa2e94831
    resource: repo://src/collections/Media.ts
  - id: openwiki-source-a4afedace59c52e55b3f7d94
    resource: repo://src/collections/Pages/hooks/revalidatePage.ts
  - id: openwiki-source-218c4b8af7ed5a00608c0f8c
    resource: repo://src/collections/Pages/index.ts
  - id: openwiki-source-e6fd8e448722e42f7eb8dbd5
    resource: repo://src/collections/Posts/hooks/revalidatePost.ts
  - id: openwiki-source-a8a63f4e59003405b3dc0961
    resource: repo://src/collections/Posts/index.ts
  - id: openwiki-source-2c42ff828c6d8e213a2f7416
    resource: repo://src/payload.config.ts
generated: { by: "pi", at: "2026-11-09T13:54:46.477Z" }
---

## Composition

`src/payload.config.ts` is the application composition root. It configures Spanish admin translations, the PostgreSQL adapter, Sharp image processing, the admin UI and live-preview breakpoints, the lexical editor defaults, eight collections, Header and Footer globals, and the project plugin list. The database connection comes from `DATABASE_URL`; Payload migrations live in `src/migrations` and generated collection types are written to `src/payload-types.ts`.

The `Pages` and `Posts` collections are versioned with drafts, scheduled publishing, and 100 ms autosave intervals for live preview. Both restrict writes to authenticated users and let anonymous readers see only published records. Pages contain a hero and an ordered `layout` of editorial blocks, while posts contain lexical rich text with a smaller post-specific block set plus taxonomy, author, related-post, and affiliate-product relationships.

## Content models and public assets

The remaining collections support the main records: `Media` stores public uploads in `public/media`, produces WebP derivatives at configured sizes, and is readable anonymously; Categories and Tags organize posts; Products hold Amazon-facing product information; Comments are publicly creatable but default to unapproved; and Users back authenticated administration. The comments collection rejects a populated hidden `website` honeypot and truncates unauthenticated create input before persistence.

## Plugins and lifecycle

`src/plugins/index.ts` installs redirects for pages and posts, nested category URLs, SEO field generation, form-builder support without payments, and a search index for posts. Redirect mutations call a revalidation hook; the search plugin uses project-specific synchronization and field overrides.

Page and post write hooks keep frontend paths coherent. Publishing or unpublishing revalidates the corresponding route and sitemap tag, deleting does the same, and a published slug change creates a redirect from the old path before it is invalidated. Page hooks special-case the `home` slug as `/`; post hooks use the post slug path.

## Related pages

- [Frontend Rendering and Routes](../frontend/rendering-and-routes.md) explains how these records become routes and UI.
- [Local Development and Production Deployment](../operations/deployment.md) covers database, media, and migration operations.
