const fs = require('fs');

const file = 'lib/mock-products.ts';
const content = fs.readFileSync(file, 'utf8');
const urls = [...content.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?q=80[^\s\"\'\`]*/g)].map(m => m[0]);

const counts = {};
urls.forEach(u => counts[u] = (counts[u] || 0) + 1);

const unique = Object.keys(counts).filter(u => counts[u] === 1);
const overused = Object.keys(counts).find(u => counts[u] > 1);

console.log('Unique available: ' + unique.length);
console.log('Overused: ' + overused + ' (' + counts[overused] + ' times)');

if (unique.length > 0 && overused) {
    let newContent = content;
    let index = 0;
    
    // We want to replace all but 1 instance of the overused URL with other unique URLs
    // We'll just cycle through the unique URLs.
    let searchIndex = 0;
    while (true) {
        searchIndex = newContent.indexOf(overused, searchIndex);
        if (searchIndex === -1) break;
        
        // Skip the first one
        if (index === 0) {
            index++;
            searchIndex += overused.length;
            continue;
        }
        
        const replacement = unique[index % unique.length];
        newContent = newContent.substring(0, searchIndex) + replacement + newContent.substring(searchIndex + overused.length);
        searchIndex += replacement.length;
        index++;
    }
    
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Replaced ' + (index - 1) + ' duplicate URLs.');
}
