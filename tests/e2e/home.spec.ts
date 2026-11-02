import { test, expect } from '../../src/fixtures/e2e.fixture';

test.describe('Home page', () => {
  test('opens successfully @smoke', async ({ homePage, page }) => {
    await homePage.goto();

    await expect(page).toHaveTitle('Automation Exercise');
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.signupLoginLink).toBeVisible();
  });
});
