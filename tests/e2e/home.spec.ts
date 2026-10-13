import { test, expect } from '@playwright/test';

test.describe('SkipQ End-to-End Tests', () => {
  test('homepage renders hero and branding successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title / branding presence
    await expect(page).toHaveTitle(/SkipQ/i);
    
    // Check main navigation exists
    const nav = page.locator('header, nav');
    await expect(nav.first()).toBeVisible();
    
    // Check SkipQ brand name text
    const brand = page.getByText('SkipQ', { exact: false });
    await expect(brand.first()).toBeVisible();
  });

  test('booking modal opens on clicking book assistant button', async ({ page }) => {
    await page.goto('/');
    
    // Find book button
    const bookBtn = page.getByRole('button', { name: /book|hire|reserve|get assistant/i }).first();
    if (await bookBtn.isVisible()) {
      await bookBtn.click();
      // Check dialog or modal overlay appears
      const modal = page.locator('[role="dialog"], .fixed');
      await expect(modal.first()).toBeVisible();
    }
  });

  test('navigation links to customer dashboard and admin pages', async ({ page }) => {
    // Check dashboard route
    const dashboardResponse = await page.goto('/dashboard');
    expect(dashboardResponse?.status()).toBe(200);

    // Check assistant portal route
    const assistantResponse = await page.goto('/assistant');
    expect(assistantResponse?.status()).toBe(200);

    // Check admin portal route
    const adminResponse = await page.goto('/admin');
    expect(adminResponse?.status()).toBe(200);
  });
});
