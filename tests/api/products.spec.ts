import { test, expect } from '../../src/fixtures/api.fixture';

test.describe('GET /api/productsList', () => {
  test('returns the product list @smoke', async ({ productsApi }) => {
    const { httpStatus, body } = await productsApi.getProductsList();

    expect(httpStatus).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('every product has the documented fields and formats @regression', async ({
    productsApi,
  }) => {
    const { body } = await productsApi.getProductsList();

    for (const product of body.products) {
      expect(product, `product ${product.id}`).toMatchObject({
        id: expect.any(Number),
        name: expect.stringMatching(/\S/),
        price: expect.stringMatching(/^Rs\. \d+$/),
        brand: expect.stringMatching(/\S/),
        category: {
          usertype: { usertype: expect.stringMatching(/\S/) },
          category: expect.stringMatching(/\S/),
        },
      });
    }
  });

  test('product ids are unique @regression', async ({ productsApi }) => {
    const { body } = await productsApi.getProductsList();

    const ids = body.products.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('contains a known product with its expected details @regression', async ({
    productsApi,
  }) => {
    const { body } = await productsApi.getProductsList();

    expect(body.products).toContainEqual({
      id: 1,
      name: 'Blue Top',
      price: 'Rs. 500',
      brand: 'Polo',
      category: { usertype: { usertype: 'Women' }, category: 'Tops' },
    });
  });
});

test.describe('POST /api/productsList', () => {
  // The site answers every request with HTTP 200 and reports the real outcome in the body,
  // so a rejected method is visible only in `responseCode`.
  test('is rejected because only GET is supported @negative', async ({ productsApi }) => {
    const result = await productsApi.postProductsList();

    expect(result).toMatchObject({
      httpStatus: 200,
      responseCode: 405,
      message: 'This request method is not supported.',
    });
  });
});
