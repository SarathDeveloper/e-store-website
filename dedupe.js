const fs = require('fs');

const file = 'lib/mock-products.ts';
const content = fs.readFileSync(file, 'utf8');

const urls = [...content.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?q=80[^\s\"\'\`]*/g)].map(m => m[0]);
const counts = {};
urls.forEach(u => counts[u] = (counts[u] || 0) + 1);

const unique = Object.keys(counts).filter(u => counts[u] === 1);
const allWorkingUrls = Object.keys(counts);

console.log('Total URLs used: ' + allWorkingUrls.length);

let newContent = content;

const overusedUrls = Object.keys(counts).filter(u => counts[u] > 1);

let replacementIndex = 0;

for (const overused of overusedUrls) {
    let searchIndex = 0;
    let index = 0;
    while (true) {
        searchIndex = newContent.indexOf(overused, searchIndex);
        if (searchIndex === -1) break;
        
        if (index === 0) {
            // Keep the first occurrence
            index++;
            searchIndex += overused.length;
            continue;
        }
        
        // Find a URL to replace it with
        const replacement = allWorkingUrls[replacementIndex % allWorkingUrls.length];
        newContent = newContent.substring(0, searchIndex) + replacement + newContent.substring(searchIndex + overused.length);
        searchIndex += replacement.length;
        replacementIndex++;
        index++;
    }
}

fs.writeFileSync(file, newContent, 'utf8');
console.log('Deduplication complete.');
