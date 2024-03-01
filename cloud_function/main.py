import base64
from google.cloud import bigquery
from cloudevents.http import CloudEvent
import functions_framework
from flask import jsonify
import json
from google.cloud import pubsub_v1

# Initialize the BigQuery client
client = bigquery.Client()
publisher = pubsub_v1.PublisherClient()

PROJECT_ID = "intrepid-kiln-415822"
TOPIC_ID = "bbc_news"

# Triggered from a message on a Cloud Pub/Sub topic.
@functions_framework.cloud_event
def publish(cloud_event: CloudEvent) -> None:
    # Decode the data from Pub/Sub
    data_str = base64.b64decode(cloud_event.data["message"]["data"]).decode()
    data = json.loads(data_str)

    # Get the category and title values
    category = data.get("category", "")
    title = data.get("title", "")

    # Print out the data from Pub/Sub, to prove that it worked
    print("category: " + category)
    print("title: " + title)


    # Construct the SQL query with parameters
    sql_query = """
    SELECT title, category
    FROM `bigquery-public-data.bbc_news.fulltext`
    WHERE (@category = "" OR category LIKE @category)
    AND (@title = "" OR title LIKE @title)
    LIMIT 50
    """

    # Execute the query with parameters
    query_job = client.query(
        sql_query,
        job_config=bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("category", "STRING", f"%{category}%"),
                bigquery.ScalarQueryParameter("title", "STRING", f"%{title}%"),
            ]
        ),
    )

    results = [{"title": row.title, "category": row.category} for row in query_job]
    print(results)
    
    message_json = json.dumps(results)
    message_bytes = message_json.encode("utf-8")

    # References an existing topic
    topic_path = publisher.topic_path(PROJECT_ID, TOPIC_ID)

    # Publishes a message
    try:
        publish_future = publisher.publish(topic_path, data=message_bytes)
        publish_future.result()  # Verify the publish succeeded
        return "Message published."
    except Exception as e:
        print(e)
        return (e, 500)
