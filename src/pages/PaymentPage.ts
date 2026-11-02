import { type Locator, type Page } from '@playwright/test';
import { type PaymentData } from '../data/factories';

export class PaymentPage {
  readonly heading: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Payment' });
  }

  async fillPaymentDetails(payment: PaymentData): Promise<void> {
    await this.page.getByTestId('name-on-card').fill(payment.nameOnCard);
    await this.page.getByTestId('card-number').fill(payment.cardNumber);
    await this.page.getByTestId('cvc').fill(payment.cvc);
    await this.page.getByTestId('expiry-month').fill(payment.expiryMonth);
    await this.page.getByTestId('expiry-year').fill(payment.expiryYear);
  }

  async payAndConfirm(): Promise<void> {
    await this.page.getByTestId('pay-button').click();
  }
}
