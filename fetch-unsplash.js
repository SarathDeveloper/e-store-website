const https = require('https');

https.get('https://unsplash.com/napi/search/photos?query=saree&per_page=10', {
    headers: {
        'User-Agent': 'Mozilla/5.0'
    }
}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            if (parsed.results && parsed.results.length > 0) {
                console.log('Success! Found ' + parsed.results.length + ' images.');
                console.log('Sample URL: ' + parsed.results[0].urls.raw);
            } else {
                console.log('No results or rate limited.', data.substring(0, 200));
            }
        } catch (e) {
            console.log('Failed to parse JSON', data.substring(0, 200));
        }
    });
}).on('error', e => console.error(e));
