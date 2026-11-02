import { test, expect } from '../../src/fixtures/e2e.fixture';
import { buildUser } from '../../src/data/factories';

test.describe('User registration', () => {
  test('registers a new user and deletes the account @smoke', async ({
    page,
    homePage,
    loginPage,
    signupPage,
    accountResultPage,
  }) => {
    const user = buildUser();

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(homePage.logo).toBeVisible();

    await homePage.header.signupLoginLink.click();
    await expect(loginPage.newUserSignupHeading).toBeVisible();

    await loginPage.startSignup(user.name, user.email);
    await expect(signupPage.heading).toBeVisible();
    await expect(signupPage.nameInput).toHaveValue(user.name);
    await expect(signupPage.emailInput).toHaveValue(user.email);

    await signupPage.fillAccountDetails(user);
    await signupPage.fillAddressDetails(user);
    await signupPage.submit();

    await expect(accountResultPage.accountCreatedHeading).toBeVisible();
    await accountResultPage.continue();

    await expect(homePage.header.loggedInAs).toContainText(user.name);

    await homePage.header.deleteAccountLink.click();
    await expect(accountResultPage.accountDeletedHeading).toBeVisible();
    await accountResultPage.continue();

    await expect(homePage.header.signupLoginLink).toBeVisible();
  });
});
