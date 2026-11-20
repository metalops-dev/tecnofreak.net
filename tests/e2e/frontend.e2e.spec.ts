import { randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";
import { getPayload } from "payload";
import config from "../../src/payload.config.js";

test.describe("Frontend", () => {
	test("can load homepage", async ({ page }) => {
		const response = await page.goto("/");
		await expect(response).not.toBeNull();
		await expect(response?.status()).toBe(200);
		await expect(page).toHaveTitle(/tecnofreak\.net/);
	});

	test("preserves and safely updates the search query", async ({ page }) => {
		await page.goto("/search?q=ps5");
		const search = page.getByRole("searchbox", { name: "Buscar noticias" });
		await expect(search).toHaveValue("ps5");
		await search.fill("audio & video");
		await expect.poll(() => new URL(page.url()).searchParams.get("q")).toBe("audio & video");
		await expect(search).toBeFocused();
		await page.reload();
		await expect(search).toHaveValue("audio & video");
	});

	test.describe("with published category posts", () => {
		const postIDs: number[] = [];
		let categoryID: number | undefined;

		test.beforeAll(async () => {
			const payload = await getPayload({ config });
			const slug = `e2e-frontend-${randomUUID()}`;
			const category = await payload.create({
				collection: "categories",
				data: { title: "E2E category", slug },
			});
			categoryID = category.id;
			for (let i = 0; i < 14; i++) {
				const post = await payload.create({
					collection: "posts",
					data: {
						title: `E2E post ${i}`,
						slug: `${slug}-${i}`,
						categories: [category.id],
						content: {
							root: {
								type: "root", direction: null, format: "", indent: 0, version: 1,
								children: [{ type: "paragraph", direction: null, format: "", indent: 0, version: 1, children: [{ type: "text", text: "Test post content.", version: 1 }] }],
							},
						},
						_status: "published",
					},
					draft: false,
					context: { disableRevalidate: true },
				});
				postIDs.push(post.id);
			}
		});

		test.afterAll(async () => {
			const payload = await getPayload({ config });
			if (postIDs.length) {
				await payload.delete({ collection: "posts", where: { id: { in: postIDs } }, context: { disableRevalidate: true } });
			}
			if (categoryID !== undefined) await payload.delete({ collection: "categories", id: categoryID });
		});

		test("links to the category index and the complete news archive", async ({ page }) => {
			await page.setViewportSize({ width: 1280, height: 900 });
			await page.goto("/");
			await expect(page.getByRole("link", { name: "Todas las categorías" })).toHaveAttribute("href", "/categorias");
			const news = page.getByRole("link", { name: "Ver todas las noticias" });
			await expect(news).toHaveAttribute("href", "/posts");
			await news.click();
			await expect(page).toHaveURL(/\/posts$/);
			await expect(page.getByRole("heading", { name: "Todas las noticias" })).toBeVisible();
		});

		test("keeps category media and labels inside their cards", async ({ page }) => {
			for (const width of [320, 768, 1280]) {
				await page.setViewportSize({ width, height: 900 });
				await page.goto("/categorias");
				const card = page.locator('a[href^="/categorias/"]').first();
				await expect(card).toBeVisible();
				for (const [imageWidth, imageHeight] of [[100, 400], [400, 100], [200, 200]]) {
					const bounds = await card.evaluate(async (link, dimensions) => {
						const frame = link.firstElementChild as HTMLElement;
						frame.innerHTML = `<div class="h-full w-full"><picture class="block w-full min-w-0 max-w-full h-full"><img class="h-full w-full object-cover" width="${dimensions[0]}" height="${dimensions[1]}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${dimensions[0]}' height='${dimensions[1]}'/%3E"></picture></div>`;
						const image = frame.querySelector("img")!;
						await image.decode();
						return { frame: frame.getBoundingClientRect().toJSON(), image: image.getBoundingClientRect().toJSON() };
					}, [imageWidth, imageHeight]);
					expect(bounds.image.height).toBeCloseTo(bounds.frame.height, 0);
					expect(bounds.image.width).toBeCloseTo(bounds.frame.width, 0);
				}
				const labels = await card.locator("h2, h2 + span").evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().toJSON()));
				expect(labels).toHaveLength(2);
				expect(labels[1].top >= labels[0].bottom || labels[1].left >= labels[0].right).toBe(true);
			}
		});
	});

	test("keeps content within narrow viewports", async ({ page }) => {
		for (const width of [320, 375, 414, 768]) {
			await page.setViewportSize({ width, height: 900 });
			await page.goto("/");
			await expect
				.poll(async () => page.evaluate(() => document.documentElement.scrollWidth))
				.toBeLessThanOrEqual(width);
		}
	});
});
