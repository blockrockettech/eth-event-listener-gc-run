const _ = require('lodash');
const {contracts} = require('koda-contract-tools');

const configuration = (network) => {
    return [
        {
            name: 'KODA V1',
            address: contracts.getKodaV1Address(network),
        },
        {
            name: 'KODA V2',
            address: contracts.getKodaV2Address(network),
        },
        {
            name: 'Auction V1',
            address: contracts.getAuctionV1Address(network),
        },
        {
            name: 'Auction V2',
            address: contracts.getAuctionV2Address(network),
        },
        {
            name: 'Artist Controls V1',
            address: contracts.getArtistControlsV1Address(network),
        },
        {
            name: 'Artist Controls V2',
            address: contracts.getArtistControlsV2Address(network),
        },
        {
            name: 'Self Service V1',
            address: contracts.getSelfServiceMinterV1Address(network),
        },
        {
            name: 'Self Service V2',
            address: contracts.getSelfServiceMinterV2Address(network),
        },
        {
            name: 'Self Service V3',
            address: contracts.getSelfServiceMinterV3Address(network),
        },
        {
            name: 'Self Service Access Controls V1',
            address: contracts.getSelfServiceAccessControlsV1Address(network),
        }
    ];
};

const configuredAddresses = (network) => {
    return _.map(configuration(network), 'address');
};

module.exports = {
    configuration,
    configuredAddresses,
    isWatchedAddress: (network, event) => {
        return _.find(configuration(network), {address: event.address});
    }
};
