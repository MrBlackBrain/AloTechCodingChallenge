import functions_framework
import random

@functions_framework.http
def hello_http(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and 'name' in request_json:
        name = request_json['name']
    elif request_args and 'name' in request_args:
        name = request_args['name']
    else:
        name = 'World'
    return 'Hello {}!'.format(name)


import functions_framework
from google.cloud import bigquery
import json

@functions_framework.http
def fetch_news_data(request):
  # Set CORS headers for the preflight request
  if request.method == "OPTIONS":
      # Allows GET requests from any origin with the Content-Type
      # header and caches preflight response for an 3600s
      headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "3600",
      }

      return ("", 204, headers)

  # Parse the request body
  request_json = request.get_json(silent=True)
  request_args = request.args

  # Extract title and category from request body
  title = request_json["title"]
  category = request_json["category"]

  if request_json and 'category' in request_json:
      title = request_json["title"]
      category = request_json["category"]
  elif request_args and 'category' in request_args:
      title = request_args["title"]
      category = request_args["category"]
  else:
      title = ''
      category = "tech"

  # Print received data for debugging
  print(f"Received request with title: {title}, category: {category}")


# Construct the SQL query with parameters
  sql_query = """
  SELECT title, category
  FROM `bigquery-public-data.bbc_news.fulltext`
  WHERE (@category = "" OR category LIKE @category)
  AND (@title = "" OR title LIKE @title)
  LIMIT 50
  """

# Continue with processing the query as in the original code...
  client = bigquery.Client()
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

  results = query_job.result()

  processed_data = []
  for row in results:
    id = len(processed_data) + 1
    count = random.randint(1, 100)
    processed_data.append({"ID": id, "Category": row["category"], "Title": row["title"], "Count": count})
    
  headers = {"Access-Control-Allow-Origin": "*"}

  return (json.dumps(processed_data), 200, headers)