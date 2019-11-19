const _ = require('lodash');

const {INFURA_API_KEY} = require('../constants');

const Web3 = require('web3');

const {contracts} = require('koda-contract-tools');

const {getNetwork} = contracts;

/**
 * Subscribe to logs using web3.eth.subscribe('logs') interface
 */
class StatelessEventSubscriber {

    constructor(network, options) {
        this.network = network;
        this.options = options;
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(`wss://${getNetwork(network)}.infura.io/ws/v3/${INFURA_API_KEY}`));
    }

    withHandler(handler) {
        this.handler = handler;
        return this;
    }

    start() {
        console.log(`Starting event watcher from block [${this.options.fromBlock}] for addresses [${this.options.address}]`);

        this.web3.eth
            .subscribe('logs', this.options, (error, result) => {
                if (!error) {
                    console.log(result);
                } else {
                    console.error(error);
                }
            })
            .on('data', async (log) => {
                console.log('data', log);
                await this.handler.handleEvent(log);
            })
            .on('changed', async (log) => {
                console.log('changed', log);
            })
            .on('error', (log) => {
                console.log('error: ', log);
            });
    }

}

module.exports = StatelessEventSubscriber;
