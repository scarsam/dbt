import { z } from "zod/v4";

export const validateQueryParams = <T>({
	rawValue,
	schema,
}: {
	rawValue: string;
	schema: z.ZodSchema<T>;
}) => {
	const trimmed = typeof rawValue === "string" ? rawValue.trim() : rawValue;
	const result = schema.safeParse(trimmed);

	if (result.success) {
		return { value: result.data, error: null } as const;
	} else {
		const prettyError = z.prettifyError(result.error);
		return { value: null, error: prettyError } as const;
	}
};
