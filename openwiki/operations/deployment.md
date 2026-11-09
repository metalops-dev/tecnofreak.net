---
type: operations
title: Local Development and Production Deployment
description: Container topology, persistent storage, image construction, and migration workflow for Tecnofreak.
tags: [docker, deployment, postgres]
verified:
  - by: openwiki/0.9.0
    at: 2026-11-09T13:54:46.477Z
sources:
  - id: openwiki-source-4435f361f53d19ef95e100a5
    resource: repo://deploy/compose.prod.yml
  - id: openwiki-source-2d0269d6d93f41e7154254ab
    resource: repo://deploy/init-cms.sh
  - id: openwiki-source-ee35d60fd303c45ef9d1e8ca
    resource: repo://deploy/release.sh
  - id: openwiki-source-b79fbbd921df689b4bbdc82f
    resource: repo://docker-compose.yml
  - id: openwiki-source-bb1ebe868e35e9e500714501
    resource: repo://Dockerfile
  - id: openwiki-source-c306fbe28866186a2df852b4
    resource: repo://src/migrations/index.ts
generated: { by: "pi", at: "2026-11-09T13:54:46.477Z" }
---

## Local development

`docker-compose.yml` runs a Node 22 Alpine `payload` service with the repository bind-mounted at `/home/node/app`. It installs locked dependencies and starts `pnpm dev`; named volumes keep `node_modules` and `.next` outside the bind mount. Its PostgreSQL 18 service exposes port 5432 and stores its data in the named `pg_data` volume at `/var/lib/postgresql`.

The local application receives a Compose-provided database URL pointing at the `postgres` service. `.env.example` documents the remaining application contract: Payload signing, canonical server URL, cron authorization, preview authorization, and optional Amazon Associates tag.

## Production services and storage

The production Compose file is separate under `deploy/`. Its application image is runtime-only: CI supplies the prebuilt `.next` directory, while the Dockerfile installs production dependencies and copies public assets and runtime source. The production `cms` service is read-only, runs as UID 1000, and persists only public media (`/mnt/tecnofreak/media_data` → `/app/public/media`) plus its Next image cache volume. An initialization job creates and chowns the media directory, and Traefik exposes the service through the configured HTTPS router.

Production PostgreSQL uses a host-mounted data directory at `/mnt/tecnofreak/db_data` with `PGDATA` set beneath the mount. This is distinct from local's named `pg_data` volume and must be treated as production state, not a directory to initialize or replace. On an empty production database, `init-cms.sh` creates the limited `cms` role and grants it database, table, sequence, and default privileges.

## Releases and migrations

`deploy/release.sh` pulls the image, runs `payload migrate` through the `cms-migrate` profile, then starts the CMS. The migration registry in `src/migrations/index.ts` provides the ordered up/down migration list that Payload executes. Because release runs migrations before the new CMS container, changes to schema, database mount, or `PGDATA` require an environment decision and verified backup before deployment.

## Related pages

- [Tecnofreak Quickstart](../quickstart.md) provides day-to-day commands.
- [CMS and Content Architecture](../architecture/cms-and-content.md) explains the Payload migration configuration and media collection.
