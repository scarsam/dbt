import { z } from "zod/v4";

export const userSearchQuerySchema = z.string().min(1, {
  message: "Search query must be at least 1 character",
});
