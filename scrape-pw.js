const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://unsplash.com/s/photos/indian-saree', { waitUntil: 'networkidle' });
  const images = await page.$$eval('img', imgs => imgs.map(img => img.src));
  
  console.log('Found ' + images.length + ' images');
  console.log(images.slice(0, 20));
  
  await browser.close();
})();
