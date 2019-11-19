const _ = require('lodash');

const registry = require('./registry');

// A selection of scrappers, responsible for obtaining events
const {StatefulEventScrapper, InboundTerminalWebHook, StatelessEventSubscriber} = require('./workers');

// A selection of handlers, responsible for writing events somewhere
const {CloudFirestoreHandler, FileWriter, HttpHandler} = require('./handlers');

// TODO add as init property
const network = 1;

// TODO add fromBlock block to config options
const fromBlock = 6270484;

const cloudFirestoreHandler = new CloudFirestoreHandler({network});
const fileWriter = new FileWriter({network});
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
    .withHandler(fileWriter)
    .onError((err) => {
        console.log(`Unable to process job`, err);
        process.exit();
    })
    .start();
