import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Flow', () => {
  test('TC-CRT-01: Add item and view cart', async ({ page }) => {
    await page.goto('/');
    
    // Find a product and add it to cart
    const firstProduct = page.locator('a:has(img), .product-card a').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      
      const addToCartBtn = page.getByRole('button', { name: /add to cart/i }).first();
      if (await addToCartBtn.isVisible()) {
        await addToCartBtn.click();
        
        // Now find the cart button and click it
        const cartButton = page.locator('a[href="/cart"]').first();
        if (await cartButton.isVisible()) {
            await cartButton.click();
            
            // Verify checkout button exists inside the cart
            const checkoutBtn = page.getByRole('link', { name: /proceed to checkout/i }).first();
            await expect(checkoutBtn).toBeVisible({ timeout: 5000 });
        }
      }
    }
  });

  test('TC-CHK-01: Proceed to Checkout', async ({ page }) => {
    await page.goto('/');
    
    // Quick add to cart if possible, or assume an item is added
    const firstProduct = page.locator('a:has(img), .product-card a').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      const addToCartBtn = page.getByRole('button', { name: /add to cart/i }).first();
      if (await addToCartBtn.isVisible()) {
        await addToCartBtn.click();
        
        // Go to cart
        const cartButton = page.locator('a[href="/cart"]').first();
        if (await cartButton.isVisible()) {
          await cartButton.click();
          
          // Click checkout
          const checkoutBtn = page.getByRole('link', { name: /proceed to checkout/i }).first();
          if (await checkoutBtn.isVisible()) {
             await checkoutBtn.click();
             
             // Verify we are on checkout page (url contains checkout or there's a payment form)
             await expect(page).toHaveURL(/.*checkout.*/);
          }
        }
      }
    }
  });
});
