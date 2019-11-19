const _ = require('lodash');

const registry = require('./registry');

const {
    CloudFirestoreHandler,
    CsvFileWriter,
    HttpHandler
} = require('./handlers');

const {
    StatefulEventScrapper,
    InboundTerminalWebHook,
    StatelessEventSubscriber
} = require('./workers');

// TODO add as init property
const network = 1;

// TODO add fromBlock block to config options
const fromBlock = 6270484;

const cloudFirestoreHandler = new CloudFirestoreHandler({network});
const csvFileWriter = new CsvFileWriter({network});
const httpHandler = new HttpHandler({network});

// // Native Subscribe
// new StatelessEventSubscriber(network, {
//     fromBlock: fromBlock,
//     toBlock: 'latest',
//     address: registry.configuredAddresses(network)
// })
//     .withHandler(handler)
//     .start();

// Terminal.co webhooks
// new InboundTerminalWebHook()
//     .withHandler(handler)
//     .start();

// getAllPastEvents
new StatefulEventScrapper(network, {
    address: registry.configuredAddresses(network),
    defaultBlockStep: 10000
})
    .withHandler(csvFileWriter)
    .onError((err) => {
        console.log(`Unable to process job`, err);
        process.exit();
    })
    .start();
