import { type APIRequestContext } from '@playwright/test';
import { readJson } from '../helpers/readJson';
import { type ApiResult } from '../models/account';
import { type ProductsListResponse } from '../models/product';

export class ProductsApi {
  constructor(private readonly request: APIRequestContext) {}

  async getProductsList(): Promise<{ httpStatus: number; body: ProductsListResponse }> {
    const response = await this.request.get('/api/productsList');
    return { httpStatus: response.status(), body: await readJson<ProductsListResponse>(response) };
  }

  /** The endpoint only supports GET; used to check how other methods are rejected. */
  async postProductsList(): Promise<ApiResult> {
    const response = await this.request.post('/api/productsList');
    const body = await readJson<{ responseCode: number; message: string }>(response);
    return { httpStatus: response.status(), ...body };
  }
}
