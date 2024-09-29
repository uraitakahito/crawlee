// For more information, see https://crawlee.dev/
import { PuppeteerCrawler } from 'crawlee';

// import { router } from './split-routes.js';
import { router } from './split-routes';

const startUrls = ['https://crawlee.dev'];

const crawler = new PuppeteerCrawler({
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
    requestHandler: router,
    // Comment this option to scrape the full website.
    maxRequestsPerCrawl: 20,
});

async function main() {
    try {
        const res = await crawler.run(startUrls);
        console.log('Main function response:', res);
    } catch (error) {
        console.error('Error in main function response:', error);
    }
}

main();
