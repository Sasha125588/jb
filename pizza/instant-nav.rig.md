# instant-nav rig: pizza

- BUILD: `bun run build:instant` creates a production artifact in `.next-instant`; `bun run start:instant` serves it on `127.0.0.1:3100`.
- EXPOSE: `INSTANT_NAV_TEST=1` enables `experimental.exposeTestingApiInProductionBuild` and the isolated `distDir`; the normal build leaves the testing API disabled.
- RUN: `bun run test:instant` runs `e2e/instant` through `playwright.instant.config.ts` against `http://127.0.0.1:3100`.
- TEST USER: anonymous browser context; locale `en`; no auth setup is required for the public login and catalog routes.
- DRIFT: locale, an accidentally restored auth cookie, upstream catalog availability/content, and cached category data can differ from an author's browser session. Tests use a fresh anonymous context and stable test IDs rather than product names.
- LOOP: local build -> start -> Playwright -> inspect failure -> edit -> repeat. Playwright owns the server and fails on `EADDRINUSE`; the existing development server remains on port 3000.
- LIVENESS: not applicable; each run builds and starts the local artifact immediately before testing.
- WALLS: the managed filesystem sandbox can deny Turbopack/PostCSS subprocess operations, so production builds may require the approved unsandboxed Bun test command. The test artifact and port are isolated from the user's running development server. System Google Chrome is used through Playwright's `chrome` channel.
