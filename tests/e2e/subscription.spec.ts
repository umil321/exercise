import { test, expect } from '../../src/fixtures/e2e.fixture';
import { buildUser } from '../../src/data/factories';

test.describe('Newsletter subscription', () => {
  test('subscribes with an email address from the footer @regression', async ({
    page,
    homePage,
  }) => {
    const { email } = buildUser();

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(homePage.logo).toBeVisible();

    await homePage.footer.scrollIntoView();
    await expect(homePage.footer.subscriptionHeading).toBeVisible();

    await homePage.footer.subscribe(email);
    await expect(homePage.footer.subscriptionSuccess).toBeVisible();
  });
});
