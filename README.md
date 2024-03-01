# AloTech Coding Challenge

## Extracting Data from BigQuery and Data Visualization

You are required to log into the Google Cloud Console, query a dataset from BigQuery
(`bigquery-public-data.bbc_news.fulltext`) and create a function in Google Cloud
Functions using Python. The function should return the received data in JSON format (Fields
are Category and Title, limit is 50). To invoke this function asynchronously, you need to
create a web application on Cloud Run. We expect you to use Cloud Pub/Sub for
asynchronous processing. Processing the returned response should include adding ID and
Count columns (ID should be sequential, while Count can be random), displaying the results
in a table, and additionally visualizing the ID and Count values with a graph.
FastAPI or Flask can be used on the backend. Any desired technology can be used for the
frontend.
All project codes, API and application links should be added to a new GitHub repository.
(Versioning with commits is crucial and impactful.)

## ToDo

- [ ] Create Google Cloud Function
  - [ ] Query through BBC dataset
  - [ ] Inputs are Category and Title
  - [ ] Limit to 50
  - [ ] Return in JSON Format
- [ ] FastAPI or Flask Backend
  - [ ] Cloud Pub/Sub
  - [ ] Invoke the Cloud Function async
  - [ ] Process the response
    - [ ] Add ID sequential
    - [ ] Add Count random
- [ ] Frontend
  - [ ] React Table
  - [ ] Grapghs
