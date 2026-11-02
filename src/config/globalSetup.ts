import { rmSync } from 'node:fs';

/** Allure appends to its results folder, so clear it to keep each report to a single run. */
export default function globalSetup(): void {
  rmSync('allure-results', { recursive: true, force: true });
}
