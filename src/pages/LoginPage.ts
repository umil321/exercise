import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly loginHeading: Locator;
  readonly newUserSignupHeading: Locator;
  readonly loginError: Locator;
  private readonly loginEmail: Locator;
  private readonly loginPassword: Locator;
  private readonly loginButton: Locator;
  private readonly signupName: Locator;
  private readonly signupEmail: Locator;
  private readonly signupButton: Locator;

  constructor(page: Page) {
    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.newUserSignupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.loginError = page.getByText('Your email or password is incorrect!');
    this.loginEmail = page.getByTestId('login-email');
    this.loginPassword = page.getByTestId('login-password');
    this.loginButton = page.getByTestId('login-button');
    this.signupName = page.getByTestId('signup-name');
    this.signupEmail = page.getByTestId('signup-email');
    this.signupButton = page.getByTestId('signup-button');
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }
}
