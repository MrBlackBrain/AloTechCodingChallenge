## Creating a Pub/Sub Topic

gcloud pubsub topics create "demo-topic" --attribute=KEY1=VAL1, KEY2=VAL2

## Testing Locally

functions-framework --target=main --source=main.py

## Create pubsuc

gcloud pubsub topics create bbc_news --

> Created topic [projects/intrepid-kiln-415822/topics/bbc_news].

## Deploy

gcloud functions deploy python-pubsub-function \
--gen2 \
--runtime=python312 \
--region=europe-west9 \
--source=. \
--entry-point=subscribe \
--trigger-topic=bbc_news

gcloud functions deploy python-pubsub-function --gen2 --runtime=python312 --region=europe-west9 --source=. --entry-point=subscribe --trigger-topic=bbc_news

## Test

gcloud pubsub topics publish bbc_news --message="Friend"

## Logs

gcloud functions logs read \
 --gen2 \
 --region=europe-west9 \
 --limit=5 \
 python-pubsub-function

gcloud functions logs read --gen2 --region=europe-west9 --limit=5 python-pubsub-function

## Test 2

gcloud pubsub topics publish bbc_news --message='{"category": "tech", "title": "Global"}'
