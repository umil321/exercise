import { type Locator, type Page } from '@playwright/test';

export class OrderPlacedPage {
  readonly heading: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.heading = page.getByTestId('order-placed');
    this.confirmationMessage = page.getByText('Congratulations! Your order has been confirmed!');
  }
}
