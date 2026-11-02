import { type Locator, type Page } from '@playwright/test';
import { CartModal } from './components/CartModal';

export class ProductsPage {
  readonly cartModal: CartModal;
  readonly heading: Locator;
  readonly searchedProductsHeading: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.cartModal = new CartModal(page);
    this.heading = page.getByRole('heading', { name: 'All Products' });
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.productNames = page.locator('.features_items .productinfo p');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  /** Hovers the product card to reveal its overlay, then clicks "Add to cart". */
  async addToCart(productName: string): Promise<void> {
    const card = this.page.locator('.product-image-wrapper').filter({ hasText: productName });
    await card.first().hover();
    await card.first().locator('.product-overlay .add-to-cart').click();
  }
}
