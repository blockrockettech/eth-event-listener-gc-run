const _ = require('lodash');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(cors());
app.options('*', cors({origin: false}));

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Simple health check to confirm it running
app.get(`/`, async (req, res, next) => {
    res.status(200)
        .send({
            name: require('../package').name,
            version: require('../package').version,
        });
});

// Inbound web hook setup in terminal
app.post(`/process`, async (req, res, next) => {
    console.log(`Processing event`, req.body.event);
    res.status(200)
        .send({
            msg: 'received'
        });
});

app.listen(port, function () {
    console.log(`Express server listening on port [${port}]`);
});
