import { test as base, expect } from '@playwright/test';
import { AccountApi } from '../api/client/accountApi';
import { ProductsApi } from '../api/client/productsApi';

type ApiFixtures = {
  accountApi: AccountApi;
  productsApi: ProductsApi;
};

export const test = base.extend<ApiFixtures>({
  accountApi: async ({ request }, use) => {
    await use(new AccountApi(request));
  },
  productsApi: async ({ request }, use) => {
    await use(new ProductsApi(request));
  },
});

export { expect };
