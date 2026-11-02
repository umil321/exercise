# automationexercise-qa

API and end-to-end tests for [automationexercise.com](https://automationexercise.com),
built with Playwright and TypeScript.

## Prerequisites

- Node.js 20 or newer
- Internet access (the tests run against the live public site)

## Install

```bash
npm install
npx playwright install --with-deps chromium
```

Optional: copy `.env.example` to `.env` to override defaults (see [Configuration](#configuration)).

## Run the tests

| Command                | What it runs                        |
| ---------------------- | ----------------------------------- |
| `npm test`             | Everything (API and E2E)            |
| `npm run test:api`     | API tests only (no browser)         |
| `npm run test:e2e`     | E2E tests only (Chromium, headless) |
| `npm run test:headed`  | E2E tests with a visible browser    |
| `npm run test:smoke`   | Only tests tagged `@smoke`          |
| `npm run report`       | Open the Playwright HTML report     |
| `npm run allure:serve` | Build and open the Allure report    |

Run a single file or a single tag:

```bash
npx playwright test tests/api/account.spec.ts
npx playwright test --grep @negative
```

Tags: `@smoke` (critical flows), `@regression` (wider coverage), `@negative` (error cases).

## Reporting

Every run writes two reports:

- **Playwright HTML report** in `playwright-report/`. Open it with `npm run report`.
  It has traces, screenshots and videos for failed tests.
- **Allure results** in `allure-results/`. Turn them into a report with either:
  - `npm run allure:serve` to build and open it in one step, or
  - `npm run allure:generate` then `npm run allure:open` to keep the report in `allure-report/`.

Allure needs **Java 8 or newer** on your machine (the `allure-commandline` package runs on it).
The results folder is cleared at the start of each run, so a report always describes one run.

## Code quality

```bash
npm run lint
npm run typecheck
npm run format:check
```

## Configuration

| Variable       | Default                          | Purpose                  |
| -------------- | -------------------------------- | ------------------------ |
| `BASE_URL`     | `https://automationexercise.com` | Site under test          |
| `NODE_OPTIONS` | not set                          | See the proxy note below |

### Behind a corporate proxy

If you see `unable to get local issuer certificate`, make Node trust the operating
system's certificates by adding `NODE_OPTIONS=--use-system-ca` to `.env`.
For the browser download, set it for that one command:

- bash: `NODE_OPTIONS=--use-system-ca npx playwright install chromium`
- PowerShell: `$env:NODE_OPTIONS='--use-system-ca'; npx playwright install chromium`

## Project structure

```
src/
  api/        API clients, response models, helpers
  pages/      Page objects (and shared components: header, footer, cart popup)
  fixtures/   Playwright fixtures (api.fixture, e2e.fixture, registeredUser)
  data/       Test data factories
  config/     Environment configuration
tests/
  api/        API tests
  e2e/        End-to-end tests
docs/         Test strategy and exploratory testing report
```

## Things to know

- **The site is a shared public demo.** Under load it can answer with
  "queue full" errors. Parallel workers are limited and failed tests are retried
  (1 locally, 2 in CI); a test that passes on retry is shown as _flaky_ in the report.
- **The API returns HTTP 200 for almost everything** and puts the real status in the
  response body (`responseCode`). API tests assert both.
- **Test data is created and removed through the API**, so tests do not depend on
  each other and leave no accounts behind.
- **Ads are blocked** in E2E tests because full-page ad overlays can swallow clicks.

## CI

GitHub Actions runs lint, type check, API tests, then E2E tests, and uploads the
HTML report and traces as artifacts. See `.github/workflows/playwright.yml`.

## Further reading

- [Test strategy](docs/TEST_STRATEGY.md)
- [Exploratory testing report](docs/EXPLORATORY_REPORT.md)
