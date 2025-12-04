import imageProxy from './services/imageProxy.js';

// Mock process.env
process.env.NODE_ENV = 'production';
process.env.RAILWAY_STATIC_URL = 'netakhoj-web-production.up.railway.app'; // No protocol

console.log('Testing Image Proxy URL Generation with missing protocol...');

const originalUrl = 'https://example.com/image.jpg';
const proxyUrl = imageProxy.createProxyUrl(originalUrl);

console.log('Original URL:', originalUrl);
console.log('Generated Proxy URL:', proxyUrl);

if (proxyUrl.startsWith('https://netakhoj-web-production.up.railway.app')) {
    console.log('✅ SUCCESS: Protocol was automatically prepended.');
} else {
    console.error('❌ FAILURE: Protocol was NOT prepended.');
    console.log('Expected start: https://netakhoj-web-production.up.railway.app');
}

// Test with protocol already present
process.env.RAILWAY_STATIC_URL = 'https://netakhoj-web-production.up.railway.app';
console.log('\nTesting Image Proxy URL Generation with existing protocol...');
const proxyUrl2 = imageProxy.createProxyUrl(originalUrl);
console.log('Generated Proxy URL 2:', proxyUrl2);

if (proxyUrl2.startsWith('https://netakhoj-web-production.up.railway.app')) {
    console.log('✅ SUCCESS: Protocol was preserved.');
} else {
    console.error('❌ FAILURE: Protocol handling is incorrect.');
}
