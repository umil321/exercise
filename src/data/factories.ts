import { randomUUID } from 'node:crypto';

export type Title = 'Mr' | 'Mrs';

export interface UserData {
  title: Title;
  name: string;
  email: string;
  password: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  newsletter: boolean;
  specialOffers: boolean;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

/** Builds a user with a unique email so tests can run in parallel without colliding. */
export function buildUser(overrides: Partial<UserData> = {}): UserData {
  const id = randomUUID().slice(0, 8);

  return {
    title: 'Mr',
    name: `test_user_${id}`,
    email: `test_user_${id}@example.com`,
    password: `Pw!${id}Aa1`,
    birthDay: '15',
    birthMonth: '6',
    birthYear: '1990',
    newsletter: true,
    specialOffers: true,
    firstName: 'Test',
    lastName: 'User',
    company: 'Company',
    address: 'Jurija gagarina 123',
    address2: 'Stan 11',
    country: 'Serbia',
    state: 'Belgrade',
    city: 'Belgrade',
    zipcode: '11070',
    mobileNumber: '+38163222555',
    ...overrides,
  };
}
