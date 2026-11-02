# automationexercise-qa

API and end-to-end test automation for [automationexercise.com](https://automationexercise.com), built with Playwright and TypeScript.

> Work in progress. Full documentation (strategy, CI notes, exploratory report) will be added as the project grows.

## Prerequisites

- Node.js 20 or newer

## Setup

```bash
npm install
npx playwright install --with-deps chromium
cp .env.example .env   # optional
```

### Behind a corporate proxy

If your network re-signs HTTPS traffic you will see `unable to get local issuer certificate`.
Make Node trust the operating system's certificate store:

- Tests: uncomment `NODE_OPTIONS=--use-system-ca` in your `.env`.
- Browser download (`.env` is not read here), set it for the one command:
  - bash: `NODE_OPTIONS=--use-system-ca npx playwright install chromium`
  - PowerShell: `$env:NODE_OPTIONS='--use-system-ca'; npx playwright install chromium`

## Running tests

```bash
npm test            # all projects
npm run test:api    # API tests only
npm run test:e2e    # E2E tests only
npm run report      # open the last HTML report
```
