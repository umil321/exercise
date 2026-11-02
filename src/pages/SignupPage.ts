import { type Locator, type Page } from '@playwright/test';
import { type UserData } from '../data/factories';

/** The "Enter Account Information" form shown after starting a signup. */
export class SignupPage {
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Enter Account Information' });
    this.nameInput = page.getByTestId('name');
    this.emailInput = page.getByTestId('email');
  }

  async fillAccountDetails(user: UserData): Promise<void> {
    await this.page.getByLabel(user.title === 'Mr' ? 'Mr.' : 'Mrs.').check();
    await this.page.getByTestId('password').fill(user.password);
    await this.page.getByTestId('days').selectOption(user.birthDay);
    await this.page.getByTestId('months').selectOption(user.birthMonth);
    await this.page.getByTestId('years').selectOption(user.birthYear);
    await this.setCheckbox('Sign up for our newsletter!', user.newsletter);
    await this.setCheckbox('Receive special offers from our partners!', user.specialOffers);
  }

  async fillAddressDetails(user: UserData): Promise<void> {
    await this.page.getByTestId('first_name').fill(user.firstName);
    await this.page.getByTestId('last_name').fill(user.lastName);
    await this.page.getByTestId('company').fill(user.company);
    await this.page.getByTestId('address').fill(user.address);
    await this.page.getByTestId('address2').fill(user.address2);
    await this.page.getByTestId('country').selectOption(user.country);
    await this.page.getByTestId('state').fill(user.state);
    await this.page.getByTestId('city').fill(user.city);
    await this.page.getByTestId('zipcode').fill(user.zipcode);
    await this.page.getByTestId('mobile_number').fill(user.mobileNumber);
  }

  async submit(): Promise<void> {
    await this.page.getByTestId('create-account').click();
  }

  private async setCheckbox(label: string, checked: boolean): Promise<void> {
    await this.page.getByLabel(label).setChecked(checked);
  }
}
