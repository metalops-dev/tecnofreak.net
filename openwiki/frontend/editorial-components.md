---
type: frontend-components
title: Editorial Components
description: The block, hero, rich-text, and article components used to turn Payload editorial data into the public site.
tags: [frontend, editorial, react]
verified:
  - by: openwiki/0.9.0
    at: 2026-11-09T13:54:46.477Z
sources:
  - id: openwiki-source-c0c4aea0d966045999497a37
    resource: repo://src/blocks/ProductBox/Component.tsx
  - id: openwiki-source-f5363f4cd05ae7b28c5733b6
    resource: repo://src/blocks/RenderBlocks.tsx
  - id: openwiki-source-bd9c62e1279d1aa2bc64747b
    resource: repo://src/components/PostPage/index.tsx
  - id: openwiki-source-176fd3a2955a8ee522cbe248
    resource: repo://src/components/RichText/index.tsx
  - id: openwiki-source-b55261ebb6cf7efd08a81d72
    resource: repo://src/heros/RenderHero.tsx
generated: { by: "pi", at: "2026-11-09T13:54:46.477Z" }
---

## Page composition

Pages use a separate hero and layout-block model. `RenderHero` maps the configured `highImpact`, `mediumImpact`, or `lowImpact` type to its implementation and renders nothing for `none` or an unknown type. `RenderBlocks` similarly maps the page collection's five layout types—archive, content, CTA, form, and media—to their server or client components; unrecognized block types are ignored.

Layout blocks compose smaller shared primitives. For example, the content block lays out CMS-authored rich-text columns and optional CMS links, and the archive block either fetches posts by selected categories or renders the chosen post documents before passing them to `CollectionArchive`.

## Rich text and post blocks

`components/RichText` is the lexical-to-React boundary. It supplies Payload converters for internal document links, uploads, and the editorial blocks available in post content: banners, media, galleries, code, CTAs, key takeaways, product boxes, quotes, and YouTube embeds. Image uploads use the project Media component; non-image uploads become external links. An optional image destination is rendered only after `isSafeImageLink` accepts it.

The post page uses this renderer for its article body, then adds product cards for linked affiliate products, sharing, advertising, newsletter, comments, and a related-post section. It fills up to three related posts by using editor-selected posts first, then matching-category posts, then recent posts that have a hero image. It also emits Article and BreadcrumbList JSON-LD from the loaded post.

## Affiliate product cards

`ProductBoxBlock` renders either an inline rich-text block or a post's linked product. It requires a populated product object, builds the outgoing Amazon URL from its ASIN, and marks the link `sponsored nofollow noopener`. It uses a media image when populated and otherwise displays a typographic fallback.

## Related pages

- [CMS and Content Architecture](../architecture/cms-and-content.md) describes the CMS fields and block registrations that feed these components.
- [Frontend Rendering and Routes](rendering-and-routes.md) describes which routes select page and post rendering.
