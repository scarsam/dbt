# DBT Capital - Hybrid User Search

This project demonstrates a modern, accessible, and type-safe user search experience using React Router v7, TypeScript, and Tailwind CSS.

## Project Criteria

- In a new Next.js 15 / React Router 7 project, create a route with a search field centered on the page. The value in this search field should be synced with a query parameter called `q`.
- As a side effect of the `q` value changing, a fetch call should be made to any endpoint, and the response should be logged to the console.
- The value from `q` should be present in the search field at hydration/first paint.
- The value from the search field should update the address bar as the user types.
- Ensure a good user experience.
- Ensure the number of requests to the endpoint is kept to a minimum.
- The code should be as type-safe as possible.
- BONUS: Ability to abort ongoing fetch calls if needed.

## Features

- **User search with debounced backend requests**
- **Type-safe validation with Zod**
- **Accessible, animated UI**
- **Robust error and loading states**
- **Clean, maintainable codebase**

## Debouncing with React Router Loaders

Originally, I considered implementing debouncing entirely on the client side using a custom React hook and `useEffect`. While this approach works, it introduces extra hooks and state management, cluttering the component logic.

Instead, inspired by [this excellent article by ProgrammingAreHard](https://programmingarehard.com/2025/02/24/debouncing-in-react-router-v7.html/), I leveraged React Router's `clientLoader` and `loader` functions. This approach allows debouncing to be handled at the routing layer, keeping UI components clean and focused on rendering.

**How it works:**

- The `clientLoader` intercepts navigation requests and uses an abortable timeout to debounce them.
- Only after the debounce period (and if the request hasn't been cancelled) does it call the server `loader`.
- This prevents unnecessary backend load and avoids race conditions, all without extra hooks in the UI.

## Why This Approach?

- **Cleaner UI code:** No need for extra hooks or `useEffect` for debouncing.
- **Resource efficiency:** Prevents sending unnecessary requests to the backend.
- **Modern React Router patterns:** Makes full use of v7's advanced features.

## Credits

- Debouncing technique adapted from [Debouncing in React Router v7](https://programmingarehard.com/2025/02/24/debouncing-in-react-router-v7.html/) by ProgrammingAreHard.

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Start the development server:
   ```bash
   pnpm run dev
   ```
3. Visit the app in your browser and try searching for users!
