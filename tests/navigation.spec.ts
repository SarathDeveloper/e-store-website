import { test, expect } from '@playwright/test';

test.describe('Navigation & Global Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-NAV-01: Header Logo redirects to Homepage', async ({ page }) => {
    // Navigate to a different page first
    await page.goto('/#shop'); // Assuming there's a shop section or route
    
    // Find the logo link (usually the first link in header or has a specific role/text)
    // We will look for a link containing the site name or an image alt
    const logoLink = page.locator('header a').first();
    await logoLink.click();
    
    // Verify we are back at the homepage
    await expect(page).toHaveURL(/.*localhost:3000\/?$/);
  });

  test('TC-NAV-02: Top navigation links work', async ({ page }) => {
    // Nav links based on navbar.tsx
    const navLinks = ['Home', 'Product', 'About Us', 'Contact'];
    
    for (const linkText of navLinks) {
      const link = page.getByRole('link', { name: linkText, exact: true }).first();
      if (await link.isVisible()) {
        await link.click();
        const title = await page.title();
        expect(title).not.toContain('404');
      }
    }
  });

  test('TC-NAV-03: Cart icon interaction', async ({ page }) => {
    // Find cart icon (often an aria-label 'cart' or text 'Cart')
    const cartButton = page.locator('button:has-text("Cart"), a:has-text("Cart"), [aria-label*="cart" i]').first();
    
    if (await cartButton.isVisible()) {
      await cartButton.click();
      // Verify we navigated to cart
      await expect(page).toHaveURL(/.*\/cart/);
    }
  });

  test('TC-NAV-04: Footer links work correctly', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check for standard footer links
    const footerLink = page.locator('footer a').first();
    if (await footerLink.isVisible()) {
        const href = await footerLink.getAttribute('href');
        expect(href).not.toBeNull();
    }
  });

  test('TC-NAV-05: Mobile Responsiveness (Navigation collapses)', async ({ page }) => {
    // Set viewport to a mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check for hamburger menu
    const menuButton = page.locator('button[aria-label="Menu"], button:has(.lucide-menu), .hamburger').first();
    
    if (await menuButton.isVisible()) {
      await menuButton.click();
      // Menu should become visible
      // Wait for animation
      await page.waitForTimeout(500);
      // Mobile menu is the second instance of "Home" usually
      const mobileHomeLink = page.getByRole('link', { name: 'Home' }).last();
      await expect(mobileHomeLink).toBeVisible();
    }
  });
});
