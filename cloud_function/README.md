# Google Cloud Pub/Sub Functions

This project demonstrates how to create a Pub/Sub topic, deploy a Cloud Function to subscribe to the topic, and test the function locally and in the cloud.

## Installation

Before you begin, make sure you have the Google Cloud SDK installed and configured. You can install it using the following command:

```bash
curl https://sdk.cloud.google.com | bash
```

## Creating a Pub/Sub Topic

To create a Pub/Sub topic, use the following command:

```bash
gcloud pubsub topics create bbc_news
```

## Testing Locally

To test the Cloud Function locally, use the following command:

```bash
functions-framework --target=main --source=main.py
```

## Deploying the Cloud Function

To deploy the Cloud Function, use the following command:

```bash
gcloud functions deploy python-pubsub-function \
--gen2 \
--runtime=python312 \
--region=europe-west9 \
--source=. \
--entry-point=subscribe \
--trigger-topic=bbc_news
```

## Testing the Cloud Function

To test the Cloud Function with a message, use the following command:

```bash
gcloud pubsub topics publish bbc_news --message='{"category": "tech", "title": "Global"}'
```

## Viewing Logs

To view the logs for the Cloud Function, use the following command:

```bash
gcloud functions logs read \
--gen2 \
--region=europe-west9 \
--limit=5 \
python-pubsub-function
```
