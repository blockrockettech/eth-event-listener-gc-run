const _ = require('lodash');

const cors = require('cors');
const express = require('express');

/**
 * Subscribe to logs using web3.eth.subscribe('logs') interface
 */
class InboundTerminalWebHook {

    constructor(options = {}) {
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

        // Simple health check to confirm it running
        app.get(`/`, async (req, res, next) => {
            res.status(200)
                .send({
                    name: require('../../package').name,
                    version: require('../../package').version,
                });
        });

        // Inbound web hook setup in terminal
        app.post(`/incoming/event`, async (req, res, next) => {
            const eventData = req.body;
            await this.handler(eventData);

            res.status(200)
                .send({
                    msg: 'received'
                });
        });

        app.listen(port, function () {
            console.log(`Express server listening on port [${port}]`);
        });
    }

}

module.exports = InboundTerminalWebHook;
