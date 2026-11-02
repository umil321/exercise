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

## Running tests

```bash
npm test            # all projects
npm run test:api    # API tests only
npm run test:e2e    # E2E tests only
npm run report      # open the last HTML report
```
