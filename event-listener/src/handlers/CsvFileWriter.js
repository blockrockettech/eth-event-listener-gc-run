const fs = require('fs');

class CsvFileWriter {

    constructor(options = {}) {
        this.options = options;
    }

    handleEvent(event) {
        console.log(`New event found [${event.event}]`);
        // TODO write to file

        fs.appendFile(`./data/events_${event.address}.json`, JSON.stringify(event) + ',\n', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }

}

module.exports = CsvFileWriter;
