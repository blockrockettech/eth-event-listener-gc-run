const _ = require('lodash');

const cors = require('cors');
const express = require('express');

const {contracts} = require('koda-contract-tools');
const {getNetwork} = contracts;

/**
 * Subscribe to logs using web3.eth.subscribe('logs') interface
 */
class InboundTerminalWebHook {

    constructor(network, options) {
        this.network = network;
        this.options = options;
    }

    withHandler(handler) {
        this.handler = handler;
        return this;
    }

    start() {
        console.log(`Starting Inbound Terminal.co event watcher`);

        const app = express();
        app.use(cors());
        app.options('*', cors({origin: false}));

        const port = process.env.PORT || 3000;

        app.post(`/incoming/event`, async (req, res, next) => {
            const eventData = req.body;
            await this.handler(this.network, eventData);
        });

        app.listen(port, function () {
            console.log(`Express server listening on port [${port}]`);
        });
    }

}

module.exports = InboundTerminalWebHook;
