import { type Locator, type Page } from '@playwright/test';
import { CartModal } from './components/CartModal';

export class ProductDetailsPage {
  readonly cartModal: CartModal;
  readonly name: Locator;
  readonly price: Locator;
  readonly quantityInput: Locator;
  private readonly addToCartButton: Locator;

  constructor(page: Page) {
    const details = page.locator('.product-information');
    this.cartModal = new CartModal(page);
    this.name = details.getByRole('heading');
    this.price = details.getByText(/^Rs\. \d+$/);
    this.quantityInput = details.locator('#quantity');
    this.addToCartButton = details.getByRole('button', { name: /Add to cart/i });
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
