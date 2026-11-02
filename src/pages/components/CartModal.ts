import { type Locator, type Page } from '@playwright/test';

/** The "Added! Your product has been added to cart." popup. */
export class CartModal {
  readonly addedMessage: Locator;
  private readonly viewCartLink: Locator;

  constructor(page: Page) {
    const modal = page.locator('.modal-content');
    this.addedMessage = modal.getByText('Your product has been added to cart.');
    this.viewCartLink = modal.getByRole('link', { name: 'View Cart' });
  }

  async viewCart(): Promise<void> {
    await this.viewCartLink.click();
  }
}
