class Handler {

    handleEvent(event, network = null) {
        console.log(`New event found`, event);
    }

}

module.exports = new Handler();
