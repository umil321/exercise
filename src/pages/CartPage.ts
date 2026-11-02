import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly breadcrumb: Locator;
  private readonly checkoutButton: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.breadcrumb = page.locator('.breadcrumb .active');
    this.checkoutButton = page.getByText('Proceed To Checkout');
  }

  productRow(productName: string): Locator {
    return this.page.locator('#cart_info_table tbody tr').filter({ hasText: productName });
  }

  quantityOf(productName: string): Locator {
    return this.productRow(productName).locator('.cart_quantity');
  }

  totalOf(productName: string): Locator {
    return this.productRow(productName).locator('.cart_total');
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
