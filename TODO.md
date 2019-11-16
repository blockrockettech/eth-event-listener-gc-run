ETH Event Listener (Google Cloud Run)
=====================================

Simple NodeJS based, event listener for ethereum based blockchains.

Goals
=====

* Dockerised 
* Node JS
* Ability to re-start if the process dies
* Ability to POST matched events from specific contracts to a configured endpoint
* Ability to define many contracts to watch
* General EVM network compatible 
* Network aware e.g. mainnet, ropsten, rinkeby, koven, Görli, POA, xDAI
* Web3.js based

General Architecture
====================

* Google Cloud Run - Dockerised NodeJS application
* Event found, POST'ed to confirgured API
* Serverless based event consumer
* Data persisted to Cloud DB
