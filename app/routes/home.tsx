import { Form, useNavigation, useSearchParams, useSubmit } from "react-router";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import type { Route } from "./+types/home";
import { fetchUsers } from "~/fetcher/users";
import { requestNotCancelled } from "~/utils/request";
import { validateQueryParams } from "~/utils/validation";
import { userSearchQuerySchema } from "~/schema/queryParams";
import { Input } from "~/components/ui/input";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "DBT Capital - Hybrid" },
    { name: "description", content: "Fetch example by Sam Ojling" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "1";

  const { value, error } = validateQueryParams({
    rawValue: q,
    schema: userSearchQuerySchema,
  });

  const response = await fetchUsers(value);

  return {
    users: response.users,
    error,
  };
}

export async function clientLoader({
  request,
  serverLoader,
}: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  if (!q) return;

  await requestNotCancelled(request, 400);
  return await serverLoader();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const query = searchParams.get("q") || "";

  // Client-side logging
  useEffect(() => {
    if (loaderData?.users && loaderData.users.length > 0) {
      console.log(
        "%c[Search Response]",
        "background: #222; color: #bada55; font-weight: bold; padding: 2px 6px; border-radius: 3px;",
        loaderData
      );
    }
  }, [loaderData]);

  return (
    <main className="flex-grow justify-center flex flex-col">
      <motion.div
        layout
        className="flex flex-col justify-center relative"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <Form onChange={(e) => submit(e.currentTarget)}>
          <Input
            autoFocus
            startIcon={Search}
            name="q"
            defaultValue={query}
            placeholder="Search for a user"
            aria-label="Search users"
          />
        </Form>

        <AnimatePresence>
          {!isLoading && loaderData?.users && loaderData.users.length > 0 && (
            <motion.ul
              key="results"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05 },
                },
                hidden: {},
              }}
              initial="hidden"
              animate="visible"
              className="space-y-4 max-h-96 overflow-y-scroll absolute top-10
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
  "
              aria-label="Search results"
            >
              {loaderData?.users?.map((user) => (
                <motion.li
                  key={user.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="border-b items-center text-sm grid grid-cols-3 p-2 mb-0"
                >
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-gray-400 truncate">
                    {user.email}
                  </div>
                  <div className="text-xs text-right">{user.company.title}</div>
                </motion.li>
              ))}
            </motion.ul>
          )}

          <motion.div
            key="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-20 text-center w-full text-gray-400 text-sm"
          >
            {!isLoading && query && loaderData?.users?.length === 0 && (
              <p>
                No results found for "
                <span className="font-medium">{query}</span>"
              </p>
            )}
            {isLoading && (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                <p>Searching…</p>
              </div>
            )}
            {!isLoading && loaderData?.error && (
              <p className="text-red-400">Error: {loaderData.error}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
