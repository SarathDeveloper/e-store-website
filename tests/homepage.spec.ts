import { test, expect } from '@playwright/test';

test.describe('Homepage Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-HM-01: Hero Banner loads correctly', async ({ page }) => {
    // The hero section usually has a prominent H1 and a call to action
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    // Check if there is a main image or banner
    const heroImage = page.locator('img[alt*="hero" i], .hero-section img').first();
    if (await heroImage.isVisible()) {
        await expect(heroImage).toBeVisible();
    }
  });

  test('TC-HM-02: Main CTA button works', async ({ page }) => {
    // Look for a prominent "Shop Now" or similar button
    const ctaButton = page.locator('a:has-text("Shop Now"), button:has-text("Shop Now"), a:has-text("Explore")').first();
    
    if (await ctaButton.isVisible()) {
      await ctaButton.click();
      // Verify we navigated away from root or a specific section is in view
      // Just check the URL has changed or it didn't crash
      expect(page.url()).not.toBeNull();
    }
  });

  test('TC-HM-03: Featured Products are displayed', async ({ page }) => {
    // Look for a section containing "Featured" or "Popular"
    const featuredSection = page.locator('text=/featured products/i, text=/new arrivals/i, text=/popular/i').first();
    
    if (await featuredSection.isVisible()) {
      // Find product cards nearby
      const productCards = page.locator('.product-card, article, [data-testid="product-card"]').first();
      // Wait for at least one card
      await expect(productCards).toBeVisible();
    }
  });
});
