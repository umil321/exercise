import { type APIRequestContext, type APIResponse } from '@playwright/test';
import { type UserData } from '../../data/factories';
import { type ApiResult } from '../models/account';

export class AccountApi {
  constructor(private readonly request: APIRequestContext) {}

  async createAccount(user: UserData): Promise<ApiResult> {
    const response = await this.request.post('/api/createAccount', {
      form: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: user.title,
        birth_date: user.birthDay,
        birth_month: user.birthMonth,
        birth_year: user.birthYear,
        firstname: user.firstName,
        lastname: user.lastName,
        company: user.company,
        address1: user.address,
        address2: user.address2,
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobileNumber,
      },
    });
    return this.toResult(response);
  }

  async deleteAccount(email: string, password: string): Promise<ApiResult> {
    const response = await this.request.delete('/api/deleteAccount', {
      form: { email, password },
    });
    return this.toResult(response);
  }

  private async toResult(response: APIResponse): Promise<ApiResult> {
    const text = await response.text();
    let body: { responseCode: number; message: string };
    try {
      body = JSON.parse(text);
    } catch {
      throw new Error(
        `${response.url()} returned non-JSON (HTTP ${response.status()}): ${text.slice(0, 200)}`,
      );
    }
    return {
      httpStatus: response.status(),
      responseCode: body.responseCode,
      message: body.message,
    };
  }
}
