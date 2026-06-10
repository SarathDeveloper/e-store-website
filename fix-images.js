const fs = require('fs');
const path = require('path');
const https = require('https');

const dirs = ['lib', 'components/web', 'app'];
const workingUrl = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop';
const filesToProcess = [];

function getFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            filesToProcess.push(fullPath);
        }
    }
}
dirs.forEach(getFiles);

const uniqueUrls = new Set();
const fileContents = new Map();

for (const file of filesToProcess) {
    const content = fs.readFileSync(file, 'utf8');
    fileContents.set(file, content);
    const urls = [...content.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?q=80[^\s\"\'\`]*/g)].map(m => m[0]);
    urls.forEach(u => uniqueUrls.add(u));
}

console.log('Found ' + uniqueUrls.size + ' unique Unsplash URLs.');

let checked = 0;
const brokenUrls = new Set();

Array.from(uniqueUrls).forEach(url => {
    https.get(url, (res) => {
        if (res.statusCode >= 400) {
            brokenUrls.add(url);
            console.log('BROKEN: ' + url);
        }
        checked++;
        if (checked === uniqueUrls.size) {
            replaceBroken();
        }
    }).on('error', () => {
        brokenUrls.add(url);
        checked++;
        if (checked === uniqueUrls.size) {
            replaceBroken();
        }
    });
});

function replaceBroken() {
    console.log('Total broken URLs found: ' + brokenUrls.size);
    if (brokenUrls.size === 0) {
        console.log('No broken URLs to fix.');
        return;
    }
    
    for (const [file, content] of fileContents.entries()) {
        let newContent = content;
        for (const broken of brokenUrls) {
            newContent = newContent.split(broken).join(workingUrl);
        }
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log('Updated ' + file);
        }
    }
    console.log('Finished fixing broken images.');
}
