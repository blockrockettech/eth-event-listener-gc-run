class Handler {

    /**
     * Handle the event in some form, all operations must be idempotent
     *
     * @param event the event
     * @param network the network ID the event originated from
     */
    handleEvent(event, network = null) {
        console.log(`New event found [${event.event}]`);

        // TODO post to API for processing
    }

}

module.exports = new Handler();
