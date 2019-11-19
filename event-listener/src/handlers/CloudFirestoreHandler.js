class CloudFirestoreHandler {

    constructor(options = {}) {
        this.options = options;
    }

    handleEvent(event, network = null) {
        console.log(`New event found [${event.event}]`);
        // TODO write to google clou dDB
    }

}

module.exports = CloudFirestoreHandler;
