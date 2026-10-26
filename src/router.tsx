import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Keep trailing slashes so every page exports as a folder with its own
    // index.html and works on static hosting (cPanel/Apache, any CDN).
    trailingSlash: "always",
  });

  return router;
};
