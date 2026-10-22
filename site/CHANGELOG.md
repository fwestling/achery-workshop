# Changelog — workshop.achery.dev

The documentation site's own history, versioned in `site/package.json`. It is separate from the library's
`CHANGELOG.md`: a site-only change bumps this file, not `achery-ui`. A change to both bumps both.

The site isn't published to npm. It deploys from `main` (`.github/workflows/site-deploy.yml`), so versions
here mark reviewed milestones rather than releases. Tag them `site-v<version>` — never `v<version>`, which
is the library's tag and triggers the npm release.

## [Unreleased]

---

## [0.1.0] - 2026-10-22

### Added
- Site skeleton: Vite + React, prerendered to static HTML, rendering achery-ui from `../src` (not npm)
- Shell built from achery-ui's own `AppBar` and `Sidebar`; theme toggle and accent swatches in the app bar,
  mode and accent controls in the sidebar footer at phone width
- Home page: version, links to npm and GitHub, and `src/docs/GettingStarted.mdx` rendered as the page body
- Docker image (nginx), `checks.yml` and `site-deploy.yml` workflows, compose block and `DEPLOY.md`

[Unreleased]: https://github.com/fwestling/achery-workshop/compare/site-v0.1.0...HEAD
[0.1.0]: https://github.com/fwestling/achery-workshop/releases/tag/site-v0.1.0
