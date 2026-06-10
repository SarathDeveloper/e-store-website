const fs = require('fs');
const https = require('https');

const productsContent = fs.readFileSync('lib/mock-products.ts', 'utf8');
const urls = [...productsContent.matchAll(/https:\/\/images\.unsplash\.com\/[^\"\'\s]+/g)].map(m => m[0]);
const uniqueUrls = [...new Set(urls)];

let failed = [];
let checked = 0;

uniqueUrls.forEach(url => {
  https.get(url, (res) => {
    if (res.statusCode >= 400) {
      console.log('FAILED (' + res.statusCode + '): ' + url);
      failed.push({ url, status: res.statusCode });
    }
    checked++;
    if (checked === uniqueUrls.length) {
      console.log('Done checking. Failed: ' + failed.length);
    }
  }).on('error', (e) => {
    console.log('ERROR: ' + url + ' - ' + e.message);
    checked++;
    if (checked === uniqueUrls.length) {
      console.log('Done checking. Failed: ' + failed.length);
    }
  });
});
