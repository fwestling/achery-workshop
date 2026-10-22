# Handover: the achery-workshop design system site

For the agent building `workshop.achery.dev`. Written 2026-10-22 at the end of the session that built
`achery.dev` (`../achery-site`) and synced achery-ui's colours with the design system. Read this whole
file, then `CLAUDE.md`, before writing anything.

---

## What Fred asked for

> "I also want the achery-workshop design system to be fully documented and reachable through this site
> — but we can work on a public site for that separately."

> "I don't particularly like the look of storybook — if there's a similar alternative that respects
> theme better, maybe that. Otherwise, I think let's go with a `site` built in achery-workshop
> specifically to showcase the themes, tokens, components etc — similar to how Claude Design lays out
> design systems."

> "What I meant was that the `achery-workshop` publishes a `site` the same way achery products do and
> the root `achery-site` links to it."

So: **a public documentation site for achery-ui, built and deployed from this repo**, at
**`workshop.achery.dev`** (Fred chose the hostname). It shows the themes, tokens and components, and it
looks like Achery, not like Storybook. `achery.dev` links to it; it does not contain it.

## Decisions already made — don't reopen

| Decision | Detail |
|---|---|
| Lives in achery-workshop | Next to the components it documents, so docs and code change together. Not in `achery-site`. |
| Hostname `workshop.achery.dev` | One level under `achery.dev`: Cloudflare's free certificate covers `*.achery.dev` only, never deeper names. |
| Not Storybook's UI | Fred dislikes its look. Ladle, and a re-themed Storybook, keep the same chrome, so the recommendation was a custom site. Keep Storybook for development (`pnpm storybook`) unless Fred says otherwise. |
| Built like the product sites | Same pipeline as `../tailstock/apps/site`, `../linkage/apps/site`, `../detent/apps/site`: Vite + React + achery-ui, prerendered to static HTML, nginx Docker image, pushed to ghcr.io, pulled by Watchtower. |
| No duplicated docs | The site must not become a second copy of `COMPONENTS.md` that drifts. Reuse the stories, MDX docs and token modules; don't retype them. |

## Open questions — ask Fred before building

Present these with a recommendation each (he prefers a recommendation to a survey):

1. **"Like Claude Design."** Nobody in the last session knew exactly what he means. The best lead is his
   own design system artifact, which is the Claude Design "Design System" type:
   https://claude.ai/artifact/Nnd1RKUWNmbcdJBkjjzmbF. Read it with the Artifact tool (`action: "read"`,
   start with `path: "project/README.md"`; list files with `scope: "files"`) to see its structure: a
   brand-book README, a token set with a usage note on every token, one guidelines page and live preview
   per component, and asset groups. Confirm with Fred that this is the layout he means, or ask for a
   screenshot. **Don't guess.**
2. **Repo shape.** The repo is a single package today (no `pnpm-workspace.yaml`). Making `site/` a
   workspace package is the natural fit, but it changes root installs and CI. Confirm that, or propose
   an alternative.
3. **Versioning the site.** `CLAUDE.md` says every change bumps `package.json` and adds to `CHANGELOG.md`.
   Both belong to the npm package. A site-only change shouldn't bump the library. Propose something
   (e.g. the site gets its own `version` and changelog section) and get a yes.
4. **Native components.** 27 components under `src/native/components` can't render in a browser as-is.
   Options: document their API only, render through react-native-web, or show screenshots. Recommend
   one.

## Current state of the repo (verified 2026-10-22)

- achery-ui **0.23.1**, published to npm.
- **38 web components** in `src/components/`, **27 native** in `src/native/components/`, **~400 glyphs** in
  `src/glyphs/svg/`. Search and categories are in `src/glyphs/glyphMeta.ts`.
- **40 `*.stories.tsx` files** in CSF3. Each `meta` carries `parameters.docs.description.component` (a
  written description), `argTypes` and `args`, and stories such as `AllTones` render variant sheets. That
  is ready-made content: the site can import the story modules (e.g. `import.meta.glob`) and render them
  in its own layout. A few components may have no story; list which.
- **MDX docs** in `src/docs/`: `GettingStarted.mdx`, `Tokens.mdx`, `Theming.mdx`, `Styleguide.mdx`. Also
  `docs/styleguide.md`, `src/theme/README.md` and `src/tokens/README.md`.
- **Tokens** (`src/tokens/`, exported as `achery-ui/tokens`): `palette`, `accentColors` /
  `accentColorNames` (14: thirteen hues plus `olive`, a legacy alias of `moss`), `lightTokens` /
  `darkTokens`, `chartColors`, `spacing`, `radius`, `shadows`, typography (`fontFamilies`, `fontSizes`,
  …), `duration` / `easing` / `zIndex`. Since 0.23.0 the web theme CSS (`src/theme/light.css.ts`,
  `dark.css.ts`, `accents.css.ts`, `material.css.ts`) is built from these modules, so a token page that
  reads them can't drift from what renders.
- **Theme axes** a visitor should be able to switch, all on `AcheryProvider` / `useTheme()`: mode
  (light/dark/system), accent (14), dial (`underline` / `chrome` / `surface`), material (`none` /
  `leather` / `wood` / `copper`), surface origin.
- **Source of truth for colours** is the design system artifact's `project/tokens.json`; achery-ui
  mirrors it. The design system writes some hues in OKLCH. achery-ui converts them to hex because React
  Native can't parse `oklch()`. If the site shows token values, show achery-ui's, and if the two
  disagree, tell Fred rather than picking one.
- **Release:** `.github/workflows/release.yml` publishes to npm on a pushed `v*` **tag**, not on merge to
  main as `CLAUDE.md` claims. Fix that line in `CLAUDE.md` while you're there. A site deploy workflow
  must be separate and must never publish to npm.
- **npm `files`:** `dist`, `src/native`, `src/charts`, `src/glyphs/svg`, `src/glyphs/nativeLookup.ts`,
  `src/glyphs/glyphMeta.ts`, `src/types`. Keep the site out of the published package.
- **Build output:** `storybook-static/` and `dist/` sit in the repo root and are gitignored. Add the site's
  build output (`dist/`, `dist-ssr/` under its folder) to `.gitignore` too.

## Known issues to fix or flag on the way

- **The `mark` glyph is not the Achery logo.** `src/glyphs/svg/mark.svg` is an arrowhead in a hexagon, and
  `src/docs/Styleguide.mdx` lists "Brand: `mark` · `wordmark`". The real logo (a hexagon-crown outline,
  terracotta `#c46a3a` light / `#d97a4a` dark) is in `../achery-site/assets/brand/achery-{light,dark}.{svg,png}`
  and drawn in `../achery-site/apps/site/src/components/marks/AcheryMark.tsx`. Use the real logo on the
  site. Ask Fred whether `mark` / `wordmark` should be replaced or relabelled. Glyph SVGs are compiled
  by `node scripts/generate-glyphs.mjs`; never hand-edit `GlyphComponents.tsx`.
- **Badge tone colours** (`src/components/Badge/Badge.css.ts`): `saved`, `drafting`, `archived`, `success`,
  `warn` and `info` use fixed light-mode palette colours in both themes. Only `stopped` and `danger` follow
  the theme (fixed in 0.23.1). A component page with a dark-mode preview will show the weak contrast.
  Flag it to Fred; don't fix it silently.
- **Accessibility is a requirement**, not polish (0.21.x was an accessibility release). The site's own
  text meets 4.5:1 in both themes, previews are keyboard-reachable, and any contrast failure a preview
  reveals is reported.

## How to build it — the product-site pattern

Copy the shape of `../tailstock/apps/site` (the newest). `../achery-site/apps/site` has the same shape,
plus the per-section accent trick.

- `src/pages.ts` lists the pages. `scripts/prerender.mjs` renders each to `dist/<path>/index.html` after
  the client build and an SSR build of `src/entry-server.tsx`. `vite.config.ts` needs
  `ssr.noExternal: ['achery-ui']`.
- `src/main.tsx` renders afresh instead of hydrating, because the theme comes from the visitor's stored
  or system preference. Consequence: a `#fragment` jump on load is lost. `../achery-site/apps/site/src/App.tsx`
  has a `useJumpToHash` effect that fixes it; copy it. (The product sites still have this bug.)
- Long-form pages render markdown with `marked` (`src/content.ts`). `SITE_STRICT=1`, set in the
  Dockerfile, fails the build on `[PLACEHOLDER]` text.
- Docker: two stages, `node:22-alpine` → `nginx:alpine`. The `nginx.conf` uses `try_files $uri
  $uri/index.html` and long caching for assets.
- CI: `checks.yml` (typecheck, tests) is called by a `deploy.yml` that builds and pushes
  `ghcr.io/fwestling/<image>`. Add a compose block (`restart: unless-stopped`, json-file logging,
  Watchtower label) and a `DEPLOY.md` with the tunnel route `workshop.achery.dev → localhost:<port>`.
- **Port:** taken so far (from the repos, not the server file): 7202–7205, 7207, 7220 (`achery-site`),
  7310–7314 (Tailstock). Pick a free one and tell Fred to check the server compose at
  `/home/fredw/server/docker-compose.yml`.
- **Building against source, not npm:** the product sites install achery-ui from npm. This site should
  render the components as they are in `src/`, so a docs change ships with the code it describes. Import
  the source (alias or workspace) and run the vanilla-extract Vite plugin and svgr, as
  `.storybook/main.ts` does.
- **Showing a component in more than one theme on one page:** a nested element with
  `data-achery-root data-theme=… data-accent=…` re-scopes achery-ui's variables for its subtree. It also
  picks up the root's font size (14px), line height and background, which you'll need to reset. See
  `AccentScope.tsx` and `.accent-scope` in `../achery-site/apps/site/src/`. Portalled components
  (Modal, Tooltip, Toast) render into `document.body` and take the theme mirrored onto `<html>`, not a
  nested scope. Preview those with the page-level theme, or document the limit.

## Suggested phases (pause after each for Fred to review, commit and tag)

1. **Answers to the open questions**, then a short plan.
2. **Skeleton and deploy:** the site package, layout, theme switcher, a home page (what achery-ui is, how
   to install it, `achery-ui/style.css`), CI, Docker, compose block, DEPLOY.md. Deployable on its own.
3. **Foundations:** colour (every palette and semantic token from the token modules, both themes, with
   contrast shown), accents, type, spacing, radius, shadows, motion, materials, dials, charts, glyphs
   (searchable, from `glyphMeta`).
4. **Components:** one page per component, from its story module and `COMPONENTS.md` (props, variants,
   usage), with live previews and a theme/accent switch. Then native, as decided in question 4.
5. **Link it from achery.dev** (below).

## Then: point achery.dev at it

In `../achery-site`:

- `apps/site/src/pages/Landing.tsx`, the `#design` section, has a comment: when `workshop.achery.dev` is
  live, it becomes the primary CTA (today the buttons go to npm and GitHub, with "Full documentation is
  on its way").
- `apps/site/src/config.ts` has `NPM_URL` and `SOURCE_URL`; add the site's URL there.
- `docs/marketing/website.md` (design system section) says the same and must change with it.
- `achery-site` isn't a git repo yet and is still at 0.1.0 (unreleased); follow its own `CLAUDE.md` for
  versioning.

## Working with Fred

These come from his global and project instructions and from feedback he's given. Follow them.

- **Never run git mutations** (`commit`, `push`, `add`, `reset`, branch changes). Stop, suggest a gitmoji
  commit message, and let him run it. Work on a branch; he creates it.
- **pnpm only**, never `npm install`. Verify any dependency version against the registry before adding
  it; pin to versions at least two weeks old; never guess.
- **`const Foo = () =>`**, never `function Foo()`, for components and all functions.
- **No shortcuts:** no `as any`, no lint suppressions, never delete or weaken a failing test. Find the root
  cause. Fix every typecheck error you see, including ones you didn't cause.
- **Changelog:** a version bump is three edits made together: `package.json`, a dated `## [x.y.z] -
  YYYY-MM-DD` heading with the entries, and the comparison links at the bottom of `CHANGELOG.md`.
  Re-read the top and bottom of the file to confirm all three landed.
- **Ask when your reasoning contradicts his instruction.** Do what he said, then raise it. Don't make
  major decisions he won't notice: surface them explicitly, not in passing.
- **Proofread before handing over:** typecheck, tests, a production build, and a visual check of the
  pages in both themes and at phone width. Headless Chrome is at
  `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`; `--blink-settings=preferredColorScheme=0|1`
  picks dark/light. It doesn't paint scrolled pages reliably, so render the page in an offset `<iframe>`
  to capture lower sections. Its windows also have a minimum width, so test phone width with a 390px
  `<iframe>`.
- **Tone:** concise, no fluff, dry wit at most in passing. Summarise before asking a question or handing
  over, and put decisions where he'll see them.
