const _ = require('lodash');

const registry = require('./registry');
const handler = require('./handler');

// TODO add as init property
const network = 1;

// TODO add fromBlock block to config options
const fromBlock = 6270484;

const {
    StatefulEventScrapper,
    InboundTerminalWebHook,
    StatelessEventSubscriber
} = require('./workers');

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
    .withHandler(handler)
    .onError((err) => {
        console.log(`Unable to process job`, err);
        process.exit();
    })
    .start();
