import { test, expect } from '@playwright/test';

test.describe('Playwright Setup Tests', () => {
  test('browser context is created', async ({ page, context }) => {
    // Verify that browser context is available
    expect(context).toBeDefined();
    expect(page).toBeDefined();
  });

  test('can navigate to data URL', async ({ page }) => {
    // Navigate to a simple data URL (doesn't require internet)
    await page.goto(
      'data:text/html,<html><head><title>Test Page</title></head><body><h1>Hello World</h1></body></html>'
    );

    // Verify the page title
    await expect(page).toHaveTitle('Test Page');

    // Verify the heading is visible
    await expect(page.getByRole('heading', { name: 'Hello World' })).toBeVisible();
  });

  test('can evaluate JavaScript', async ({ page }) => {
    await page.goto('data:text/html,<html><body></body></html>');

    // Test JavaScript evaluation
    const result = await page.evaluate(() => {
      return 2 + 2;
    });

    expect(result).toBe(4);
  });
});
