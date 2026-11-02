import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://automationexercise.com',
};
