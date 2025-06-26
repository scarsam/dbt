import { describe, it, expect } from "vitest";
import { z } from "zod/v4";
import { validateQueryParams } from "./validation";

const testSchema = z
	.string()
	.min(1, { message: "Search query must be at least 1 character" });

describe("validateQueryParams", () => {
	it("returns value for valid input", () => {
		const result = validateQueryParams({
			rawValue: "test",
			schema: testSchema,
		});

		expect(result.value).toBe("test");
		expect(result.error).toBeNull();
	});

	it("returns error for empty input", () => {
		const result = validateQueryParams({
			rawValue: "",
			schema: testSchema,
		});

		expect(result.value).toBeNull();
		expect(result.error).toBeDefined();
		expect(result.error).toContain("Search query must be at least 1 character");
	});

	it("returns error for whitespace-only input", () => {
		const result = validateQueryParams({
			rawValue: "   ",
			schema: testSchema,
		});

		expect(result.value).toBeNull();
		expect(result.error).toBeDefined();
	});

	it("handles complex schema validation", () => {
		const emailSchema = z.string().email("Invalid email format");

		const validResult = validateQueryParams({
			rawValue: "test@example.com",
			schema: emailSchema,
		});

		const invalidResult = validateQueryParams({
			rawValue: "invalid-email",
			schema: emailSchema,
		});

		expect(validResult.value).toBe("test@example.com");
		expect(validResult.error).toBeNull();

		expect(invalidResult.value).toBeNull();
		expect(invalidResult.error).toBeDefined();
		expect(invalidResult.error).toContain("Invalid email format");
	});
});
