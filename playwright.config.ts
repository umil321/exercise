import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 1,
  // The public demo site returns "queue full" errors under heavy parallel load.
  workers: isCI ? 2 : 3,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  globalSetup: './src/config/globalSetup.ts',
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        environmentInfo: { BASE_URL: env.baseUrl, NODE: process.version },
      },
    ],
    ...(isCI ? ([['github']] as const) : []),
  ],
  use: {
    baseURL: env.baseUrl,
    testIdAttribute: 'data-qa',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: env.baseUrl,
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
    {
      name: 'e2e',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
