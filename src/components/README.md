# Components

One folder per web component: `<Name>.tsx` (component and its types), `<Name>.css.ts` (vanilla-extract
styles), `<Name>.stories.tsx` (Storybook stories, also rendered on the documentation site) and
`index.ts`. Every component is exported from the main `achery-ui` entry (`src/index.ts`).

- **Props and usage:** [COMPONENTS.md](../../COMPONENTS.md), the single API reference.
- **Live examples** in any theme, accent, dial and material:
  [workshop.achery.dev/components](https://workshop.achery.dev/components).
- **Adding one:** see "Adding a new component" in [CLAUDE.md](../../CLAUDE.md). A component gets a page
  on the site from its story, and its API from its `COMPONENTS.md` section.
