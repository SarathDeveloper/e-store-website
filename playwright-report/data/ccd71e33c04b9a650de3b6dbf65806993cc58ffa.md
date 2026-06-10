# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wishlist.spec.ts >> Wishlist Functionality >> TC-WSH-01: Add item to wishlist from Product Card
- Location: tests\wishlist.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /move to cart/i }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /move to cart/i }).first()

```

```yaml
- button
- text: E-Store Couture
- heading "Welcome to E-Store!" [level=3]
- paragraph:
  - text: Join our premium newsletter and get
  - strong: 10% OFF
  - text: your first purchase of custom or readymade couture.
- text: Use Code WELCOME10
- textbox "Enter your email"
- button "Claim Offer"
- button "No thanks, I prefer paying full price"
- link "Contact us on WhatsApp":
  - /url: https://wa.me/919876543210
- banner:
  - link "E-Store":
    - /url: /
    - heading "E-Store" [level=1]
  - button "Deliver to Your address"
  - textbox "What you're looking for"
  - button "Search"
  - button "Sign In"
  - link "Cart":
    - /url: /cart
  - button "Menu"
  - link "Explore":
    - /url: /shop
  - link "Deals":
    - /url: /shop
  - link "Saved":
    - /url: /account/wishlist
  - link "Home":
    - /url: /
  - link "Product":
    - /url: /shop
  - link "About Us":
    - /url: /about
  - link "Contact":
    - /url: /contact
  - link "Ethnic Wear":
    - /url: /shop?category=Ethnic Wear
  - link "Western Wear":
    - /url: /shop?category=Western Wear
  - link "Party Wear":
    - /url: /shop?category=Party Wear
  - link "Office Wear":
    - /url: /shop?category=Office Wear
  - link "Bottom Wear":
    - /url: /shop?category=Bottom Wear
  - link "Seasonal Collections":
    - /url: /shop?category=Seasonal Collections
  - link "Custom Tailoring":
    - /url: /about
  - link "Bridal Aari Work":
    - /url: /about
  - link "See more":
    - /url: /shop
- main:
  - link "E-Store":
    - /url: /
    - heading "E-Store" [level=1]
  - heading "Welcome Back" [level=2]
  - paragraph: Login to manage your orders and appointments
  - text: Mobile Number
  - textbox "Mobile Number":
    - /placeholder: Enter your 10 digit mobile number
  - button "Send OTP" [disabled]
  - paragraph: By continuing, you agree to our Terms and Privacy Policy.
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Wishlist Functionality', () => {
  4  |   test('TC-WSH-01: Add item to wishlist from Product Card', async ({ page }) => {
  5  |     // Navigate to the shop or homepage where products are listed
  6  |     await page.goto('/shop');
  7  |     
  8  |     // Wait for products to load
  9  |     await page.waitForSelector('.product-card, a:has(img)', { timeout: 10000 });
  10 | 
  11 |     // Find the first product's wishlist button (the heart icon)
  12 |     // The button has aria-label="Toggle Wishlist"
  13 |     const wishlistBtn = page.getByRole('button', { name: 'Toggle Wishlist' }).first();
  14 |     
  15 |     // Ensure it's visible before interacting
  16 |     if (await wishlistBtn.isVisible()) {
  17 |       await wishlistBtn.click();
  18 |       
  19 |       // Navigate to the wishlist page
  20 |       await page.goto('/account/wishlist');
  21 |       
  22 |       // Verify there is at least one item in the wishlist
  23 |       // We look for a Move to Cart button which implies an item is rendered
  24 |       const moveToCartBtn = page.getByRole('button', { name: /move to cart/i }).first();
> 25 |       await expect(moveToCartBtn).toBeVisible({ timeout: 5000 });
     |                                   ^ Error: expect(locator).toBeVisible() failed
  26 |     }
  27 |   });
  28 | 
  29 |   test('TC-WSH-02: Remove item from wishlist', async ({ page }) => {
  30 |     // First add an item to ensure the wishlist is not empty
  31 |     await page.goto('/shop');
  32 |     const wishlistBtn = page.getByRole('button', { name: 'Toggle Wishlist' }).first();
  33 |     if (await wishlistBtn.isVisible()) {
  34 |       await wishlistBtn.click();
  35 |     }
  36 | 
  37 |     // Go to wishlist page
  38 |     await page.goto('/account/wishlist');
  39 | 
  40 |     // Find the trash/remove button on the wishlist page
  41 |     // The button has a Trash2 icon inside it, usually it's a generic button so we select by context or class
  42 |     // In page.tsx: <button onClick={() => removeFromWishlist(item.id)} className="absolute top-4 right-4 ... text-red-500 ...
  43 |     const removeBtn = page.locator('button.text-red-500').first();
  44 |     
  45 |     if (await removeBtn.isVisible()) {
  46 |       await removeBtn.click();
  47 |       
  48 |       // Verify empty state appears if it was the only item
  49 |       // Or simply verify the specific item is removed. 
  50 |       // Since we don't know exact counts, we can check that a change occurred.
  51 |       // If it's empty, we should see "Your wishlist is empty"
  52 |       const emptyMessage = page.locator('text=/Your wishlist is empty/i').first();
  53 |       // Relaxed check: either the list is empty or the item count decreased.
  54 |     }
  55 |   });
  56 | 
  57 |   test('TC-WSH-03: Move item from wishlist to cart', async ({ page }) => {
  58 |     // Add item to wishlist
  59 |     await page.goto('/shop');
  60 |     const wishlistBtn = page.getByRole('button', { name: 'Toggle Wishlist' }).first();
  61 |     if (await wishlistBtn.isVisible()) {
  62 |       await wishlistBtn.click();
  63 |     }
  64 | 
  65 |     // Go to wishlist
  66 |     await page.goto('/account/wishlist');
  67 |     
  68 |     // Find Move to Cart button
  69 |     const moveToCartBtn = page.getByRole('button', { name: /move to cart/i }).first();
  70 |     
  71 |     if (await moveToCartBtn.isVisible()) {
  72 |       await moveToCartBtn.click();
  73 |       
  74 |       // Wait a moment for state updates
  75 |       await page.waitForTimeout(500);
  76 | 
  77 |       // Verify cart has the item now by navigating to cart
  78 |       await page.goto('/cart');
  79 |       const checkoutBtn = page.getByRole('link', { name: /proceed to checkout/i }).first();
  80 |       await expect(checkoutBtn).toBeVisible({ timeout: 5000 });
  81 |     }
  82 |   });
  83 | });
  84 | 
```