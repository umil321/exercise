import { type APIResponse } from '@playwright/test';

/**
 * Parses the response body as JSON regardless of the Content-Type header (the site labels its
 * JSON as text/html). A non-JSON body, such as the "queue full" overload page, fails with the
 * URL, HTTP status and start of the body instead of a bare SyntaxError.
 */
export async function readJson<T>(response: APIResponse): Promise<T> {
  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      `${response.url()} returned non-JSON (HTTP ${response.status()}): ${text.slice(0, 200)}`,
    );
  }
}
