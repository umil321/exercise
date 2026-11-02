import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly newUserSignupHeading: Locator;
  private readonly signupName: Locator;
  private readonly signupEmail: Locator;
  private readonly signupButton: Locator;

  constructor(page: Page) {
    this.newUserSignupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupName = page.getByTestId('signup-name');
    this.signupEmail = page.getByTestId('signup-email');
    this.signupButton = page.getByTestId('signup-button');
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }
}
