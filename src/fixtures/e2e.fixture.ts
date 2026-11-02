import { test as base } from '@playwright/test';
import { AccountResultPage } from '../pages/AccountResultPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

type E2EFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountResultPage: AccountResultPage;
};

export const test = base.extend<E2EFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  accountResultPage: async ({ page }, use) => {
    await use(new AccountResultPage(page));
  },
});

export { expect } from '@playwright/test';
