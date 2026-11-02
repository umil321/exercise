import { buildUser, type UserData } from '../data/factories';
import { expect, test } from './e2e.fixture';

/**
 * Call once inside a `test.describe` block. Registers the hooks:
 *
 * - PRECONDITION (`beforeEach`): creates a new user through the API, so the test does not
 *   depend on the signup UI.
 * - POSTCONDITION (`afterEach`): deletes that user through the API, even if the test failed,
 *   so no accounts are left behind on the site.
 *
 * Returns a handle whose `user` is the user created for the current test.
 */
export function useRegisteredUser(): { readonly user: UserData } {
  let current: UserData | undefined;

  test.beforeEach(async ({ accountApi }) => {
    const newUser = buildUser();

    const response = await accountApi.createAccount(newUser);
    expect(response).toMatchObject({ responseCode: 201, message: 'User created!' });

    current = newUser;
  });

  test.afterEach(async ({ accountApi }) => {
    if (!current) return; // the precondition failed, so there is nothing to delete

    const response = await accountApi.deleteAccount(current.email, current.password);
    expect(response).toMatchObject({ responseCode: 200, message: 'Account deleted!' });

    current = undefined;
  });

  return {
    get user(): UserData {
      if (!current) {
        throw new Error('useRegisteredUser: no user exists outside of a running test');
      }
      return current;
    },
  };
}
