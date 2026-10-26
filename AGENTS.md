<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Static export for cPanel hosting
The site must build to plain static files for cPanel hosting (`npm run build` → upload the contents of `dist/client`). Why: the user hosts on shared Apache hosting with no Node server.
- `vite.config.ts` prerenders every page (all 22 routes, including each `/tours/$slug` and `/experiences/$category` listed by concrete path). When a tour or experience is added, add its path to `staticPages` in `vite.config.ts` or it won't export.
- `src/router.tsx` sets `trailingSlash: "always"` — required, otherwise the prerenderer and the router fight over trailing slashes and pages silently skip export.
- Keep all images local (`src/assets` imports or `public/`); never use Lovable asset pointers (`*.asset.json` / `__l5e` URLs) — they only resolve on Lovable hosting.
- No server functions or API routes may be added; the exported site has no backend.
