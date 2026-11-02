import { type Locator, type Page } from '@playwright/test';

/** Top navigation, present on every page. */
export class Header {
  readonly signupLoginLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loggedInAs: Locator;

  constructor(page: Page) {
    const nav = page.locator('header');
    this.signupLoginLink = nav.getByRole('link', { name: /Signup \/ Login/i });
    this.productsLink = nav.getByRole('link', { name: /Products/i });
    this.cartLink = nav.getByRole('link', { name: /Cart/i });
    this.deleteAccountLink = nav.getByRole('link', { name: /Delete Account/i });
    this.loggedInAs = nav.getByText(/Logged in as/i);
  }
}
