const _ = require('lodash');

const registry = require('./registry');
const handler = require('./handler');

// TODO add as init property
const network = 1;

// TODO add fromBlock block to config options
const fromBlock = 6270484;

const addresses = registry.configuredAddresses(network);

const options = {
    fromBlock: fromBlock,
    toBlock: 'latest',
    address: addresses
};

const SubscribeLogs = require('./jobs/SubscribeLogs');

new SubscribeLogs(network, options)
    .withHandler(handler)
    .start();
