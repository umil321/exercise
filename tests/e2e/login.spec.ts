import { test, expect } from '../../src/fixtures/e2e.fixture';
import { buildUser, type UserData } from '../../src/data/factories';

test.describe('Login with correct credentials', () => {
  let user: UserData | undefined;

  // PRECONDITION: Registers a new user through the API, so the test does not depend on the signup UI.
  test.beforeEach(async ({ accountApi }) => {
    const newUser = buildUser();

    const response = await accountApi.createAccount(newUser);
    expect(response).toMatchObject({ responseCode: 201, message: 'User created!' });

    user = newUser;
  });

  // POSTCONDITION: Deletes the user through the API so no accounts are left behind on the site.
  test.afterEach(async ({ accountApi }) => {
    if (!user) return; // the precondition failed, so there is nothing to delete

    const response = await accountApi.deleteAccount(user.email, user.password);
    expect(response).toMatchObject({ responseCode: 200, message: 'Account deleted!' });

    user = undefined;
  });

  test('logs in with correct email and password @smoke', async ({ page, homePage, loginPage }) => {
    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(homePage.logo).toBeVisible();

    await homePage.header.signupLoginLink.click();
    await expect(loginPage.loginHeading).toBeVisible();

    await loginPage.login(user!.email, user!.password);
    await expect(homePage.header.loggedInAs).toContainText(user!.name);
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
