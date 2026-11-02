import { type Locator, type Page } from '@playwright/test';
import { Header } from './components/Header';

export class HomePage {
  readonly header: Header;
  readonly logo: Locator;
  readonly signupLoginLink: Locator;

  constructor(private readonly page: Page) {
    this.header = new Header(page);
    this.logo = page.getByRole('link', { name: /Website for automation practice/i });
    this.signupLoginLink = this.header.signupLoginLink;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
