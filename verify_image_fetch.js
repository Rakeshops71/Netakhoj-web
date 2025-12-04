import fetch from 'node-fetch';

const imageUrl = 'https://myneta.info/images_candidate/mynetai_ews5L...'; // The URL from the logs (truncated, need to find a real one or use a similar one)
// Actually, the log had truncated URLs. Let's try to find a real URL from the codebase or use a known one.
// The user's log showed: https://myneta.info/images_candidate/mynetai_ews5L...
// I will try to fetch a known image from myneta.info to test connectivity and headers.
// Example: https://myneta.info/images_candidate/modi_narendra.jpg (Hypothetical, but I'll try a generic one if I can't find the exact one)
// Better yet, I'll use the proxy logic to test.

// Since I don't have the full URL from the logs, I will use a standard one from the site if possible, or just test the proxy endpoint if the server was running.
// But I can't easily start the full server. I will simulate the fetch logic from `routes/api.js` in this script.

async function fetchWithRetry(url, options, retries = 3, backoff = 1000) {
    try {
        const response = await fetch(url, options);
        if (!response.ok && response.status >= 500) {
            throw new Error(`Server error: ${response.status}`);
        }
        return response;
    } catch (error) {
        if (retries <= 0 || error.name === 'AbortError') throw error;
        console.log(`[Fetch] Retrying... attempts left: ${retries}. Error: ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
}

async function testFetch() {
    // I need a valid URL. Let's try to find one from the codebase or search.
    // The user search was "narendra modi".
    // I'll try to fetch the main page of myneta.info first to see if it's accessible.
    const url = 'https://myneta.info';

    console.log(`Testing fetch to ${url}...`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

    try {
        const response = await fetchWithRetry(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Connection': 'keep-alive'
            }
        });

        clearTimeout(timeout);

        if (response.ok) {
            console.log('✅ Fetch successful!');
            console.log('Status:', response.status);
            console.log('Headers:', response.headers.raw());
        } else {
            console.error('❌ Fetch failed with status:', response.status);
        }

    } catch (error) {
        console.error('❌ Fetch failed with error:', error);
    }
}

testFetch();
