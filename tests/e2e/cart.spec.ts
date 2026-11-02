import { test, expect } from '../../src/fixtures/e2e.fixture';

test.describe('Cart', () => {
  const PRODUCT = { name: 'Blue Top', price: 'Rs. 500' };
  const QUANTITY = 4;
  const EXPECTED_TOTAL = 'Rs. 2000';

  test('cart shows the exact quantity chosen on the product page @smoke', async ({
    page,
    homePage,
    productDetailsPage,
    cartPage,
  }) => {
    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(homePage.logo).toBeVisible();

    await homePage.viewProduct(PRODUCT.name);
    await expect(page).toHaveURL(/\/product_details\//);
    await expect(productDetailsPage.name).toHaveText(PRODUCT.name);
    await expect(productDetailsPage.price).toHaveText(PRODUCT.price);

    await productDetailsPage.setQuantity(QUANTITY);
    await expect(productDetailsPage.quantityInput).toHaveValue(String(QUANTITY));
    await productDetailsPage.addToCart();
    await expect(productDetailsPage.cartModal.addedMessage).toBeVisible();
    await productDetailsPage.cartModal.viewCart();

    await expect(page).toHaveURL(/\/view_cart/);
    await expect(cartPage.productRow(PRODUCT.name)).toBeVisible();
    await expect(cartPage.quantityOf(PRODUCT.name)).toHaveText(String(QUANTITY));
    await expect(cartPage.totalOf(PRODUCT.name)).toHaveText(EXPECTED_TOTAL);
  });
});
