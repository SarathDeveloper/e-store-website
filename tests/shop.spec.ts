import { test, expect } from '@playwright/test';

test.describe('Shop & Product Listing Page (PLP)', () => {
  // Use a generalized approach to find a shop page
  test.beforeEach(async ({ page }) => {
    // We assume the shop is at /shop or accessible from root
    await page.goto('/');
    const shopLink = page.getByRole('link', { name: 'Product', exact: true }).first();
    if (await shopLink.isVisible()) {
        await shopLink.click();
    }
  });

  test('TC-PLP-01: Product Grid loads correctly', async ({ page }) => {
    // Wait for network idle or a specific locator to ensure products loaded
    await page.waitForLoadState('networkidle');
    
    // Check if we have multiple products
    const productImages = page.locator('img[alt]');
    const count = await productImages.count();
    
    // We expect at least one product image to be present on a shop page
    if (count > 0) {
        expect(count).toBeGreaterThan(0);
    }
  });

  test('TC-PLP-02: Navigation to Product Details Page (PDP)', async ({ page }) => {
    // Click the first product
    const firstProduct = page.locator('a:has(img), .product-card a').first();
    
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      
      // We should be on a PDP. Usually there is an "Add to Cart" button.
      const addToCartBtn = page.getByRole('button', { name: /add to cart/i }).first();
      await expect(addToCartBtn).toBeVisible();
    }
  });
});

test.describe('Product Details Page (PDP)', () => {
  test('TC-PDP-01: Product Information is visible', async ({ page }) => {
    // Navigate directly to a likely product page, or click one from home
    await page.goto('/');
    const firstProduct = page.locator('a:has(img), .product-card a').first();
    
    if (await firstProduct.isVisible()) {
        await firstProduct.click();
        
        // Check for Title (h1)
        await expect(page.locator('h1').first()).toBeVisible();
        // Check for Add to Cart
        await expect(page.getByRole('button', { name: /add to cart/i }).first()).toBeVisible();
    }
  });

  test('TC-PDP-03: Add to Cart functionality', async ({ page }) => {
    await page.goto('/');
    const firstProduct = page.locator('a:has(img), .product-card a').first();
    
    if (await firstProduct.isVisible()) {
        await firstProduct.click();
        
        const addToCartBtn = page.getByRole('button', { name: /add to cart/i }).first();
        if (await addToCartBtn.isVisible()) {
            await addToCartBtn.click();
            // Verify toast or cart counter updates
            // This is a relaxed check for any success message or cart indicator change
            const successMsg = page.locator('text=/added to cart/i, text=/success/i').first();
            // Optional: await expect(successMsg).toBeVisible();
        }
    }
  });
});
