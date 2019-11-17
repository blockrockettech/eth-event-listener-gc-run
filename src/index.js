const _ = require('lodash');

const registry = require('./registry');
const handler = require('./handler');

// TODO add as init property
const network = 1;

// TODO add fromBlock block to config options
const fromBlock = 6270484;

const SubscribeLogs = require('./jobs/SubscribeLogs');

const InboundTerminalWebHook = require('./jobs/InboundTerminalWebHook');

// Native Subscribe
new SubscribeLogs(network, {
    fromBlock: fromBlock,
    toBlock: 'latest',
    address: registry.configuredAddresses(network)
})
    .withHandler(handler)
    .start();

// Terminal.co webhooks
// new InboundTerminalWebHook()
//     .withHandler(handler)
//     .start();
