import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly logo: Locator;
  readonly signupLoginLink: Locator;

  constructor(private readonly page: Page) {
    this.logo = page.getByRole('link', { name: /Website for automation practice/i });
    this.signupLoginLink = page.getByRole('link', { name: /Signup \/ Login/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
