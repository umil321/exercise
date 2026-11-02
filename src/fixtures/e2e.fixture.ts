import { test as base, expect } from '@playwright/test';
import { AccountApi } from '../api/client/accountApi';
import { AccountResultPage } from '../pages/AccountResultPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

type E2EFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountResultPage: AccountResultPage;
  accountApi: AccountApi;
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
  accountApi: async ({ request }, use) => {
    await use(new AccountApi(request));
  },
});

export { expect };
