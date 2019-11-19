const axios = require('axios');

class HttpHandler {

    constructor(options = {}) {
        this.options = options;
    }

    /**
     * Handle the event in some form, all operations must be idempotent
     *
     * @param event the event
     * @param network the network ID the event originated from
     */
    handleEvent(event, network = null) {
        console.log(`New event found [${event.event}]`);
        return axios.post(`http://localhost:3000/process`, event);
    }

}

module.exports = HttpHandler;
