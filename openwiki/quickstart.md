---
type: quickstart
title: Tecnofreak Quickstart
description: Practical entry points for working on the Tecnofreak Next.js and Payload CMS application.
tags: [quickstart, nextjs, payload]
verified:
  - by: openwiki/0.9.0
    at: 2026-11-09T13:54:46.477Z
sources:
  - id: openwiki-source-5f5b95b3d6a215fa02ceb945
    resource: repo://.env.example
  - id: openwiki-source-b79fbbd921df689b4bbdc82f
    resource: repo://docker-compose.yml
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-2c42ff828c6d8e213a2f7416
    resource: repo://src/payload.config.ts
generated: { by: "pi", at: "2026-11-09T13:54:46.477Z" }
---

## What this repository contains

Tecnofreak is a Next.js application backed by Payload CMS and PostgreSQL. Payload is configured from `src/payload.config.ts`; frontend routes are in `src/app/(frontend)`, Payload admin and API routes are in `src/app/(payload)`, editorial schemas are in `src/collections`, and reusable rendering code is organized under `src/blocks`, `src/components`, and `src/heros`.

## Local development

Copy or provide the environment values documented in `.env.example`, including the database URL, Payload secret, public server URL, cron secret, and preview secret. The local Compose stack starts a Node development service on port 3000 and PostgreSQL on port 5432. It mounts the working tree into the application container and maintains separate named volumes for dependencies, Next build cache, and PostgreSQL data.

The package manager is pnpm. The primary commands are:

- `pnpm dev` — run the Next development server.
- `pnpm build` — create a webpack-based production build.
- `pnpm start` — serve that build.
- `pnpm lint` — run ESLint across the repository.
- `pnpm test` — run the integration and browser test suites.
- `pnpm payload` — invoke the Payload CLI; migration and type/import-map generation scripts are also exposed in `package.json`.

## Where to go next

- [CMS and Content Architecture](architecture/cms-and-content.md) covers Payload models, plugins, and content lifecycle.
- [Frontend Rendering and Routes](frontend/rendering-and-routes.md) covers public route behavior.
- [Editorial Components](frontend/editorial-components.md) covers blocks, heroes, rich text, and article composition.
- [Testing and Verification](testing/verification.md) covers the test harnesses and current coverage.
- [Local Development and Production Deployment](operations/deployment.md) distinguishes local containers from production persistence and release behavior.
