import { type Locator, type Page } from '@playwright/test';

/** Confirmation pages shown after an account is created or deleted. */
export class AccountResultPage {
  readonly accountCreatedHeading: Locator;
  readonly accountDeletedHeading: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    this.accountCreatedHeading = page.getByTestId('account-created');
    this.accountDeletedHeading = page.getByTestId('account-deleted');
    this.continueButton = page.getByTestId('continue-button');
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }
}
