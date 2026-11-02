import { test as base, expect } from '@playwright/test';
import { AccountApi } from '../api/client/accountApi';
import { AccountResultPage } from '../pages/AccountResultPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { OrderPlacedPage } from '../pages/OrderPlacedPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ProductsPage } from '../pages/ProductsPage';
import { SignupPage } from '../pages/SignupPage';

type E2EFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountResultPage: AccountResultPage;
  productsPage: ProductsPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  orderPlacedPage: OrderPlacedPage;
  accountApi: AccountApi;
};

/**
 * The site shows Google ads, including full-page "vignette" overlays that can cover the page
 * and swallow clicks at random. Ads are not what we test, so their requests are blocked.
 */
const AD_REQUESTS = /googlesyndication|doubleclick|googleadservices|adservice\.google|adsbygoogle/;

export const test = base.extend<E2EFixtures>({
  page: async ({ page }, use) => {
    await page.route(AD_REQUESTS, (route) => route.abort());
    await use(page);
  },
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
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  orderPlacedPage: async ({ page }, use) => {
    await use(new OrderPlacedPage(page));
  },
  accountApi: async ({ request }, use) => {
    await use(new AccountApi(request));
  },
});

export { expect };
