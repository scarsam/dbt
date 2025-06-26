import type z from "zod/v4";
import type { UserSchema, UsersSchema } from "~/schema/users";

export type User = z.infer<typeof UserSchema>;
export type UsersResponse = z.infer<typeof UsersSchema>;
