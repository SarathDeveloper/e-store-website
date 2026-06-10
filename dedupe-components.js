const fs = require('fs');

const allWorkingUrls = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1594921671569-b590e8f395f1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
];

function dedupeFile(file) {
    const content = fs.readFileSync(file, 'utf8');
    const urls = [...content.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?q=80[^\s\"\'\`]*/g)].map(m => m[0]);
    const counts = {};
    urls.forEach(u => counts[u] = (counts[u] || 0) + 1);

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
                index++;
                searchIndex += overused.length;
                continue;
            }
            const replacement = allWorkingUrls[replacementIndex % allWorkingUrls.length];
            // Fix: ensure the replacement has the same dimensions/params as original if needed, 
            // but just replacing it outright is fine for these components since Next.js Image fill or specified dimensions will handle it.
            newContent = newContent.substring(0, searchIndex) + replacement + newContent.substring(searchIndex + overused.length);
            searchIndex += replacement.length;
            replacementIndex++;
            index++;
        }
    }
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Deduped ' + file);
    }
}

['components/web/home-categories.tsx', 'components/web/hero-carousel.tsx', 'components/web/instagram-gallery.tsx'].forEach(dedupeFile);
