const https = require('https');
const queries = ['saree', 'kurti', 'lehenga', 'western wear', 'office wear fashion'];

const results = {};
let completed = 0;

queries.forEach(q => {
    https.get('https://unsplash.com/s/photos/' + encodeURIComponent(q), {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const matches = [...data.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?q=80[^\s\"\'\`]*/g)].map(m => m[0]);
            results[q] = Array.from(new Set(matches)).map(url => url.split('&')[0] + '&w=800&auto=format&fit=crop');
            completed++;
            if (completed === queries.length) {
                console.log(JSON.stringify(results, null, 2));
            }
        });
    }).on('error', e => {
        console.error(e);
        completed++;
    });
});
