import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    async requestHandler({ $, request }) {
        const title = $('title').text();
        console.log(`The title of "${request.url}" is: ${title}.`);
    },
});

async function main() {
    try {
        const res = await crawler.run(['https://crawlee.dev']);
        console.log('Main function response:', res);
    } catch (error) {
        console.error('Error in main function response:', error);
    }
}

main();
