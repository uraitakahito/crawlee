import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    // Let's limit our crawls to make our
    // tests shorter and safer.
    maxRequestsPerCrawl: 10,
    // enqueueLinks is an argument of the requestHandler
    async requestHandler({ $, request, enqueueLinks }) {
        const title = $('title').text();
        console.log(`The title of "${request.url}" is: ${title}.`);
        // The enqueueLinks function is context aware,
        // so it does not require any parameters.
        await enqueueLinks({
            strategy: 'all', // wander the internet
        });
    },
});

async function main() {
    try {
        const res = await crawler.run(['https://www.yahoo.co.jp']);
        console.log('Main function response:', res);
    } catch (error) {
        console.error('Error in main function response:', error);
    }
}

main();
