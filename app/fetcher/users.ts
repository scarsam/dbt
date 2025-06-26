import type { UsersResponse } from "~/types/users";

export const fetchUsers = async (query: string | null) => {
	try {
		const response = await fetch(
			`https://dummyjson.com/users/search?q=${query}`,
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json() as Promise<UsersResponse>;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to fetch users: ${error.message}`);
		}
		throw new Error("Failed to fetch users: Unknown error");
	}
};
