import { describe, expect, it } from "vitest";
import { isSafeImageLink } from "@/utilities/validateImageLink";

describe("isSafeImageLink", () => {
	it("accepts HTTP and HTTPS URLs", () => {
		expect(isSafeImageLink("https://example.com/image")).toBe(true);
		expect(isSafeImageLink("http://example.com/image")).toBe(true);
	});

	it("rejects unsafe and malformed URLs", () => {
		expect(isSafeImageLink("javascript:alert(1)")).toBe(false);
		expect(isSafeImageLink("/internal-image")).toBe(false);
		expect(isSafeImageLink("not a URL")).toBe(false);
	});
});
