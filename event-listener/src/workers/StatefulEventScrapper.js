const _ = require('lodash');

const {INFURA_API_KEY} = require('../constants');

const Web3 = require('web3');

const {contracts, getContractForNetworkAndAddress} = require('koda-contract-tools');

const {getNetwork} = contracts;

/**
 * Recursively get all logs for specific contracts
 *
 * State is stored to determine the last working block scrapped
 */
class StatefulEventScrapper {

    constructor(network, {address, defaultBlockStep}) {
        this.network = network;
        this.address = address;
        this.defaultBlockStep = defaultBlockStep;
        this.currentStep = {};
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(`wss://${getNetwork(network)}.infura.io/ws/v3/${INFURA_API_KEY}`));
    }

    withHandler(handler) {
        this.handler = handler;
        return this;
    }

    onError(onError) {
        this.onError = onError;
        return this;
    }

    async start() {
        try {
            console.log(`Starting stateful event scrapper for addresseses [${this.address}]`);

            const results = () => _.map(this.address, async (_address) => {
                console.log(`Get all events for [${_address}]`);

                // Contract details
                const {address, abi, deploymentBlock} = getContractForNetworkAndAddress(this.network, _address);

                // Get batch
                return this._getNextBatchForAddress(address, abi, deploymentBlock)
                    .then((events) => {
                        // Handle events
                        return Promise.all(_.map(events, (event) => {
                            return this.handler.handleEvent(event);
                        }));
                    })
                    .then(() => {
                        // wait X seconds
                        return new Promise((resolve) => {
                            setTimeout(resolve, 5000);
                        });
                    })
                    // Start the flow again (recursion)
                    .then(results);
            });

            await Promise.all(results.call(this));

        } catch (err) {
            this.onError(err);
        }
    }

    async _getNextBatchForAddress(address, abi, deploymentBlock) {

        const WatchingContract = new this.web3.eth.Contract(abi, address);

        // Work out starting point
        const fromBlock = this.currentStep[address] || deploymentBlock;

        // Work out ending point
        const toBlock = this.currentStep[address]
            ? this.currentStep[address] + this.defaultBlockStep
            : deploymentBlock + this.defaultBlockStep;

        console.log(`Looking up events from [${address}] fromBlock [${fromBlock}] toBlock [${toBlock}]`);

        const events = await WatchingContract.getPastEvents('allEvents', {
            fromBlock: fromBlock,
            toBlock: toBlock
        });

        // Update current step
        this.currentStep[address] = toBlock;
        console.log(`Found [${events.length}] events`);

        // Get unique blocks from the matched events
        const uniqueBlockNumbers = _.uniq(_.map(events, 'blockNumber'));

        // Look up block details
        const blocks = await Promise.all(_.map(uniqueBlockNumbers, (blockNumber) => {
            return this.web3.eth.getBlock(blockNumber);
        }));

        // Ensure sorted correctly by blockNumber & transactionIndex
        return _.map(_.sortBy(events, ['blockNumber', 'transactionIndex']), (event) => {

            // Find matching block to extract timestamp
            const foundBlock = _.find(blocks, {number: event.blockNumber});

            return {
                ...event,
                timestamp: foundBlock.timestamp,
            };
        });
    }

}

module.exports = StatefulEventScrapper;
