ETH Event Listener (Google Cloud Run)
=====================================

Simple NodeJS based, event listener for ethereum based blockchains.

Goals
=====

* Dockerised
* Google Cloud Run Application
* Node JS based
* Web3 JS based
* Multiple options for consuming events e.g. native subscribe, inbound webhooks from 3rd parties etc
* Ability to re-start if the process dies
* Ability to POST matched events from specific contracts to a configured endpoint
* Ability to define many contracts to watch
* General EVM network compatibility - e.g. mainnet, ropsten, rinkeby, koven, Görli, POA, xDAI

General Architecture
====================

* Google Cloud Run - Dockerised NodeJS application
* Event found, POST'ed to configured API
* Serverless based event consumer
* Data persisted to Cloud DB

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
