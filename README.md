ETH Event Listener (Google Cloud Run)
=====================================

Simple NodeJS based, event listener for ethereum based blockchains.

Goals
=====

* Dockerised - DONE
* Google Cloud Run Application - DONE
* Node JS based - DONE
* Web3 JS based - DONE
* Multiple options for consuming events e.g. native subscribe, inbound webhooks from 3rd parties etc  - DONE
* Ability to define many contracts to watch - DONE
* Ability to POST matched events from specific contracts to a configured endpoint  - DONE
* Ability to write matched events from specific contracts to a file  - DONE
* Ability to write matched events from specific contracts to a Google Cloud DB
* Ability to re-start if the process dies
* General EVM network compatibility - e.g. mainnet, ropsten, rinkeby, koven, Görli, POA, xDAI

General Architecture
====================

* `event-listener` 
    - scrapes and listens for event from a set of configured smart contracts
    - Found events are handled by a set of available handlers which can write top files, DB or post to endpoints such as `event-processor-api`  
    - Stateful implementations maintain the current last block scrapped from the network
* `event-processor-api` is a simple serverless and statelsss API
    - New events are handle accordingly and persisted to Cloud DB

### Google Cloud Run Setup

* `gcloud init` and login/auth

* Select create new configuration
    * Select `koda-eth-event-listener`

* After setting up both accounts run
    * `gcloud config configurations list` and you should see something similar to this

* You can view and change the properties of your active configuration using the following commands:

```
$ gcloud config list
$ gcloud config set
```

* `gcloud config configurations list`

### Deployment

* `./build_image.sh` - build and push new Docker image to GCP repo
