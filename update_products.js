const fs = require('fs');
let content = fs.readFileSync('lib/mock-products.ts', 'utf8');

// Price map
const priceMap = {
  '₹14,999': '$149.99',
  '₹15,999': '$159.99',
  '₹12,999': '$129.99',
  '₹11,999': '$119.99',
  '₹8,999': '$89.99',
  '₹9,999': '$99.99',
  '₹7,999': '$79.99',
  '₹6,999': '$69.99',
  '₹6,499': '$64.99',
  '₹5,999': '$59.99',
  '₹4,999': '$49.99',
  '₹4,599': '$45.99',
  '₹3,999': '$39.99',
  '₹3,599': '$35.99',
  '₹3,499': '$34.99',
  '₹3,299': '$32.99',
  '₹2,999': '$29.99',
  '₹2,499': '$24.99',
  '₹2,299': '$22.99',
  '₹2,199': '$21.99',
  '₹1,999': '$19.99',
  '₹1,899': '$18.99',
  '₹1,699': '$16.99',
  '₹1,499': '$14.99',
  '₹1,299': '$12.99',
  '₹899': '$8.99',
};

// Replace prices
for (let key in priceMap) {
  content = content.split(key).join(priceMap[key]);
}

// Map IDs to specific image IDs
const imageMap = {
  1: '1610030469983-98e550d6193c', // Red saree
  2: '1615886753866-79396abc446e', // Purple Saree -> use banarasi image
  5: '1589465885857-44edb59bbff2', // Ruffle saree -> use cotton saree image
  7: '1585487000160-6ebcfceb0d03', // Anarkali -> use silk kurta image
  8: '1595777457583-95e059d581b8', // Lehenga -> use embroidered kurti
  12: '1572804013309-59a88b7e92f1', // Cocktail dress -> use maxi dress
  19: '1598554747436-c9293d6a588f', // Blazer -> use white shirt
  20: '1582142306909-195724d33ffc', // Pencil Skirt -> use pleated skirt
  22: '1572804013309-59a88b7e92f1', // Shimmer bodycon -> use maxi dress
  23: '1585487000160-6ebcfceb0d03', // Velvet Gown -> use silk kurta
  24: '1544816155-12df9643f363', // Trench coat -> use puffer jacket
  30: '1615886753866-79396abc446e', // Georgette saree
};

// We need to carefully replace the image URL for specific product IDs
let lines = content.split('\n');
let currentId = null;

for (let i = 0; i < lines.length; i++) {
  let idMatch = lines[i].match(/id:\s*(\d+),/);
  if (idMatch) {
    currentId = parseInt(idMatch[1]);
  }
  
  if (lines[i].includes('image: "') && currentId !== null && imageMap[currentId]) {
    lines[i] = lines[i].replace(/photo-[a-zA-Z0-9\-]+\?/, `photo-${imageMap[currentId]}?`);
  }
}

content = lines.join('\n');
fs.writeFileSync('lib/mock-products.ts', content, 'utf8');
console.log('Updated mock-products.ts');
