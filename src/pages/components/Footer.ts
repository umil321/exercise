import { type Locator, type Page } from '@playwright/test';

/** Page footer, including the newsletter subscription form. Present on every page. */
export class Footer {
  readonly subscriptionHeading: Locator;
  readonly subscriptionSuccess: Locator;
  private readonly footer: Locator;
  private readonly emailInput: Locator;
  private readonly subscribeButton: Locator;

  constructor(page: Page) {
    this.footer = page.locator('footer');
    this.subscriptionHeading = this.footer.getByRole('heading', { name: 'Subscription' });
    this.emailInput = this.footer.locator('#susbscribe_email');
    this.subscribeButton = this.footer.locator('#subscribe');
    this.subscriptionSuccess = this.footer
      .locator('#success-subscribe')
      .getByText('You have been successfully subscribed!');
  }

  async scrollIntoView(): Promise<void> {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async subscribe(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.subscribeButton.click();
  }
}
