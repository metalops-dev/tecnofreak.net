import { describe, expect, it } from "vitest";
import { Categories } from "@/collections/Categories";
import { Posts } from "@/collections/Posts";

describe("category editorial configuration", () => {
	it("supports category images and creating categories while editing a post", () => {
		const image = Categories.fields?.find(
			(field) => "name" in field && field.name === "image",
		);
		const postTabs = Posts.fields?.find((field) => field.type === "tabs");
		const categories =
			postTabs && "tabs" in postTabs
				? postTabs.tabs.flatMap((tab) => tab.fields).find(
						(field) => "name" in field && field.name === "categories",
					)
				: undefined;

		expect(image).toMatchObject({ relationTo: "media", type: "upload" });
		expect(categories).toMatchObject({ admin: { allowCreate: true } });
	});
});
