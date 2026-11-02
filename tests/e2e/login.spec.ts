import { test, expect } from '../../src/fixtures/e2e.fixture';
import { buildUser } from '../../src/data/factories';
import { useRegisteredUser } from '../../src/fixtures/registeredUser';

test.describe('Login with correct credentials', () => {
  // PRECONDITION / POSTCONDITION: a user is created through the API before each test
  // and deleted through the API after it.
  const account = useRegisteredUser();

  test('logs in with correct email and password @smoke', async ({ page, homePage, loginPage }) => {
    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(homePage.logo).toBeVisible();

    await homePage.header.signupLoginLink.click();
    await expect(loginPage.loginHeading).toBeVisible();

    await loginPage.login(account.user.email, account.user.password);
    await expect(homePage.header.loggedInAs).toContainText(account.user.name);
  });
});

test.describe('Login with incorrect credentials', () => {
  // No precondition needed: the user is built but never registered, so the credentials are wrong.
  test('shows an error for incorrect email and password @negative', async ({
    page,
    homePage,
    loginPage,
  }) => {
    const unknownUser = buildUser();

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(homePage.logo).toBeVisible();

    await homePage.header.signupLoginLink.click();
    await expect(loginPage.loginHeading).toBeVisible();

    await loginPage.login(unknownUser.email, unknownUser.password);
    await expect(loginPage.loginError).toBeVisible();
    await expect(homePage.header.loggedInAs).toBeHidden();
  });
});
