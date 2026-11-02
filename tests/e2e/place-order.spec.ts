import { test, expect } from '../../src/fixtures/e2e.fixture';
import { buildPayment } from '../../src/data/factories';
import { useRegisteredUser } from '../../src/fixtures/registeredUser';

const PRODUCT = { name: 'Blue Top', price: 'Rs. 500' };

test.describe('Place order', () => {
  // PRECONDITION / POSTCONDITION: a user is created through the API before each test
  // and deleted through the API after it.
  const account = useRegisteredUser();

  test('registered user places an order for a product @smoke', async ({
    page,
    homePage,
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
    paymentPage,
    orderPlacedPage,
  }) => {
    const registeredUser = account.user;
    const payment = buildPayment({
      nameOnCard: `${registeredUser.firstName} ${registeredUser.lastName}`,
    });

    await test.step('Log in as the registered user', async () => {
      await homePage.goto();
      await expect(page).toHaveTitle('Automation Exercise');
      await expect(homePage.logo).toBeVisible();

      await homePage.header.signupLoginLink.click();
      await expect(loginPage.loginHeading).toBeVisible();

      await loginPage.login(registeredUser.email, registeredUser.password);
      await expect(homePage.header.loggedInAs).toContainText(registeredUser.name);
    });

    await test.step('Add a product to the cart', async () => {
      await homePage.header.productsLink.click();
      await expect(productsPage.heading).toBeVisible();

      await productsPage.addToCart(PRODUCT.name);
      await expect(productsPage.cartModal.addedMessage).toBeVisible();
      await productsPage.cartModal.viewCart();
    });

    await test.step('Verify the cart and proceed to checkout', async () => {
      await expect(page).toHaveURL(/\/view_cart/);
      await expect(cartPage.breadcrumb).toHaveText('Shopping Cart');
      await expect(cartPage.productRow(PRODUCT.name)).toContainText(PRODUCT.price);

      await cartPage.proceedToCheckout();
    });

    await test.step('Verify address details and the order review', async () => {
      await expect(checkoutPage.addressDetailsHeading).toBeVisible();
      for (const address of [checkoutPage.deliveryAddress, checkoutPage.billingAddress]) {
        await expect(address).toContainText(
          `${registeredUser.firstName} ${registeredUser.lastName}`,
        );
        await expect(address).toContainText(registeredUser.address);
        await expect(address).toContainText(registeredUser.city);
        await expect(address).toContainText(registeredUser.country);
        await expect(address).toContainText(registeredUser.mobileNumber);
      }

      await expect(checkoutPage.reviewOrderHeading).toBeVisible();
      await expect(checkoutPage.orderRow(PRODUCT.name)).toContainText(PRODUCT.price);

      await checkoutPage.addComment('Please leave the parcel at the front desk.');
      await checkoutPage.placeOrder();
    });

    await test.step('Pay and confirm the order', async () => {
      await expect(paymentPage.heading).toBeVisible();

      await paymentPage.fillPaymentDetails(payment);
      await paymentPage.payAndConfirm();

      await expect(orderPlacedPage.heading).toBeVisible();
      await expect(orderPlacedPage.confirmationMessage).toBeVisible();
    });
  });
});
