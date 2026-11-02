import { test, expect } from '../../src/fixtures/e2e.fixture';

test.describe('Product search', () => {
  // "Jeans" is a term whose results are matched by product name only, so every result
  // can be checked against it. (A broader term like "top" also matches by category.)
  const SEARCH_TERM = 'Jeans';

  test('shows only products related to the searched name @smoke', async ({
    page,
    homePage,
    productsPage,
  }) => {
    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(homePage.logo).toBeVisible();

    await homePage.header.productsLink.click();
    await expect(page).toHaveURL(/\/products/);
    await expect(productsPage.heading).toBeVisible();

    await productsPage.search(SEARCH_TERM);
    await expect(productsPage.searchedProductsHeading).toBeVisible();

    // Guard against a vacuous pass: there must be results before checking each of them.
    await expect(productsPage.productCards).not.toHaveCount(0);
    for (const card of await productsPage.productCards.all()) {
      await expect(card).toBeVisible();
    }
    for (const name of await productsPage.productNames.allTextContents()) {
      expect(name, `product "${name}" should match the search term`).toMatch(
        new RegExp(SEARCH_TERM, 'i'),
      );
    }
  });
});
