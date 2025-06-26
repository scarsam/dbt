import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock fetch globally
global.fetch = vi.fn();

// Mock motion components to avoid animation issues in tests
vi.mock("motion/react", () => ({
	motion: {
		div: ({ children, ...props }: any) =>
			React.createElement("div", props, children),
		ul: ({ children, ...props }: any) =>
			React.createElement("ul", props, children),
		li: ({ children, ...props }: any) =>
			React.createElement("li", props, children),
		p: ({ children, ...props }: any) =>
			React.createElement("p", props, children),
	},
	AnimatePresence: ({ children }: any) =>
		React.createElement(React.Fragment, null, children),
}));
