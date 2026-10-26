// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const staticPages = [
  { path: "/" },
  { path: "/about" },
  { path: "/contact" },
  { path: "/faq" },
  { path: "/plan-my-trip" },
  { path: "/stays" },
  { path: "/support" },
  { path: "/transport" },
  { path: "/tours/" },
  { path: "/experiences/" },
  // Concrete tour detail pages (parameterized routes must be listed per URL)
  { path: "/tours/3-day-maasai-mara-classic-safari" },
  { path: "/tours/amboseli-kilimanjaro-views" },
  { path: "/tours/samburu-wildlife-escape" },
  { path: "/tours/diani-beach-extension" },
  { path: "/tours/mara-group-departure" },
  { path: "/tours/nairobi-national-park-day-trip" },
  { path: "/tours/giraffe-centre-karen-day-tour" },
  { path: "/tours/7-day-kenya-grand-safari" },
  // Experience category pages
  { path: "/experiences/adventure" },
  { path: "/experiences/cultural" },
  { path: "/experiences/romantic" },
  { path: "/experiences/corporate" },
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Prerender every page to plain HTML files so the built site can be
    // hosted anywhere as static files (e.g. cPanel) with no Node server.
    pages: staticPages,
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
