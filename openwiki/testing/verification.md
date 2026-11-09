---
type: testing
title: Testing and Verification
description: The Vitest and Playwright test layers, their configuration, and the currently covered representative behaviors.
tags: [testing, vitest, playwright]
verified:
  - by: openwiki/0.9.0
    at: 2026-11-09T13:54:46.477Z
sources:
  - id: openwiki-source-5e753d9d77984cb67aae1517
    resource: repo://playwright.config.ts
  - id: openwiki-source-d011b3ea4e23fc4a51b11701
    resource: repo://tests/e2e/admin.e2e.spec.ts
  - id: openwiki-source-cdf590b5f482d7cf39614143
    resource: repo://tests/e2e/frontend.e2e.spec.ts
  - id: openwiki-source-f9513f73ffd0d230eca14180
    resource: repo://tests/int/api.int.spec.ts
  - id: openwiki-source-b58f839a189d87a7e1f37d39
    resource: repo://vitest.config.mts
generated: { by: "pi", at: "2026-11-09T13:54:46.477Z" }
---

## Commands and harnesses

`pnpm test` runs the integration suite followed by end-to-end tests. `pnpm test:int` uses Vitest with a Node environment, the project setup file, and both `tests/int/**/*.int.spec.ts` and `tests/unit/**/*.spec.ts`. `pnpm test:e2e` runs Playwright; it starts `pnpm dev` locally or `pnpm start` in CI unless a compatible server already exists.

Playwright takes its base URL from `NEXT_PUBLIC_SERVER_URL` (defaulting to `http://localhost:3000`) and runs desktop Chromium and Firefox projects. CI forbids focused tests, retries failures twice, and serializes workers; traces are collected on the first retry.

## Existing coverage

Unit tests cover the external image-link safety predicate and YouTube ID extraction across supported and rejected URL shapes. The integration API test initializes Payload, verifies the users collection is queryable, creates a category and product relationship with access overridden, and removes its created documents afterward.

The frontend E2E suite checks that the homepage returns HTTP 200 with the expected title and that it has no horizontal overflow at several narrow and medium viewports. The admin E2E suite seeds a user and post, logs in, verifies dashboard/list/create flows, and checks the public post's admin-bar edit link. Its cleanup removes the seeded post and user after the suite.

## Running safely

Integration and E2E tests interact with the configured Payload database and application URL. Use the repository's test environment configuration rather than a production database or public deployment URL, and confirm the target services are available before running the full suite.

## Related pages

- [Tecnofreak Quickstart](../quickstart.md) lists the package commands.
- [Frontend Rendering and Routes](../frontend/rendering-and-routes.md) describes the user-facing routes exercised by browser tests.
