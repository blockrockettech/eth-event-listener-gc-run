#!/usr/bin/env bash

gcloud config configurations activate koda-eth-event-listener;

gcloud builds submit --tag gcr.io/known-origin-io/eth-event-processor;
