import { type Locator, type Page } from '@playwright/test';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export class HomePage {
  readonly header: Header;
  readonly footer: Footer;
  readonly logo: Locator;
  readonly signupLoginLink: Locator;

  constructor(private readonly page: Page) {
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.logo = page.getByRole('link', { name: /Website for automation practice/i });
    this.signupLoginLink = this.header.signupLoginLink;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async viewProduct(productName: string): Promise<void> {
    const card = this.page
      .locator('.features_items .product-image-wrapper')
      .filter({ hasText: productName });
    await card.first().getByRole('link', { name: 'View Product' }).click();
  }
}
