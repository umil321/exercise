import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly addressDetailsHeading: Locator;
  readonly reviewOrderHeading: Locator;
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  private readonly commentBox: Locator;
  private readonly placeOrderButton: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.addressDetailsHeading = page.getByRole('heading', { name: 'Address Details' });
    this.reviewOrderHeading = page.getByRole('heading', { name: 'Review Your Order' });
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.commentBox = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
  }

  orderRow(productName: string): Locator {
    return this.page.locator('#cart_info tbody tr').filter({ hasText: productName });
  }

  async addComment(comment: string): Promise<void> {
    await this.commentBox.fill(comment);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }
}
