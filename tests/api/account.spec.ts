import { type AccountApi } from '../../src/api/client/accountApi';
import { buildUser, type UserData } from '../../src/data/factories';
import { test, expect } from '../../src/fixtures/api.fixture';

// The site reports every outcome in the body (`responseCode`) while the HTTP status stays 200.

// Accounts that exist and must be removed after the current test.
const activeUsers: UserData[] = [];

/** Creates the account and remembers it for cleanup, but only if it was really created. */
async function createAccount(accountApi: AccountApi, user: UserData) {
  const response = await accountApi.createAccount(user);
  if (response.responseCode === 201) activeUsers.push(user);
  return response;
}

/** Deletes the account and stops tracking it, but only if it was really deleted. */
async function deleteAccount(accountApi: AccountApi, user: UserData) {
  const response = await accountApi.deleteAccount(user.email, user.password);
  if (response.responseCode === 200) activeUsers.splice(activeUsers.indexOf(user), 1);
  return response;
}

// POSTCONDITION: every account still existing at the end of a test is deleted through the API,
// even if the test failed, so no accounts are left behind on the site.
test.afterEach(async ({ accountApi }) => {
  for (const user of [...activeUsers]) {
    const response = await deleteAccount(accountApi, user);
    expect(response).toMatchObject({ responseCode: 200, message: 'Account deleted!' });
  }
});

test.describe('POST /api/createAccount', () => {
  test('creates an account with valid details @smoke', async ({ accountApi }) => {
    const response = await createAccount(accountApi, buildUser());

    expect(response).toEqual({
      httpStatus: 200,
      responseCode: 201,
      message: 'User created!',
    });
  });

  test('rejects an email address that is already registered @negative', async ({ accountApi }) => {
    const user = buildUser();
    const first = await createAccount(accountApi, user);
    expect(first.responseCode, 'precondition: first account created').toBe(201);

    const duplicate = await createAccount(accountApi, { ...user, name: 'Another Name' });

    expect(duplicate).toEqual({
      httpStatus: 200,
      responseCode: 400,
      message: 'Email already exists!',
    });
  });
});

test.describe('DELETE /api/deleteAccount', () => {
  test('deletes an existing account @smoke', async ({ accountApi }) => {
    const user = buildUser();
    const created = await createAccount(accountApi, user);
    expect(created.responseCode, 'precondition: account created').toBe(201);

    const response = await deleteAccount(accountApi, user);

    expect(response).toEqual({
      httpStatus: 200,
      responseCode: 200,
      message: 'Account deleted!',
    });

    // The account is really gone: the same email can be registered again.
    const recreated = await createAccount(accountApi, user);
    expect(recreated).toMatchObject({ responseCode: 201, message: 'User created!' });
  });

  test('does not delete an account when the password is wrong @negative', async ({
    accountApi,
  }) => {
    const user = buildUser();
    const created = await createAccount(accountApi, user);
    expect(created.responseCode, 'precondition: account created').toBe(201);

    const response = await accountApi.deleteAccount(user.email, 'WrongPassword1!');

    expect(response).toEqual({
      httpStatus: 200,
      responseCode: 404,
      message: 'Account not found!',
    });

    // The account must still exist: registering the same email again is refused.
    const stillExists = await accountApi.createAccount(user);
    expect(stillExists).toMatchObject({ responseCode: 400, message: 'Email already exists!' });
  });
});
