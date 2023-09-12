# Person API Documentation

## Table of Contents

- [Standard Formats for Requests and Responses](#standard-formats-for-requests-and-responses)
- [Sample Usage](#sample-usage)
- [Known Limitations and Assumptions](#known-limitations-and-assumptions)
- [Setting Up and Deploying the API](#setting-up-and-deploying-the-api)

---

## Standard Formats for Requests and Responses

### 1. Fetching All Persons (GET /api)

#### Request Format:

- Method: GET
- Endpoint: `/api`

#### Response Format:

- Status Code: 200 (OK)
- Response Body:
  ```json
  [
    {
      "_id": "user_id",
      "name": "person_name"
    },
    {
      "_id": "user_id",
      "name": "person_name"
    },
    {
      "_id": "user_id",
      "name": "person_name"
    },
    {
      "_id": "user_id",
      "name": "person_name"
    },
    {
      "_id": "user_id",
      "name": "person_name"
    },
    {
      "_id": "user_id",
      "name": "person_name"
    }
  ]
  ```

### 2. Adding a New Person (POST /api)

#### Request Format:

- Method: POST
- Endpoint: `/api`
- Request Body:
  ```json
  {
    "name": "person_name"
  }
  ```

#### Response Format:

- Status Code: 201 (Created)
- Response Body:
  ```json
  {
    "message": "person_name was successfully created.",
    "user_id": "user_id"
  }
  ```

### 3. Fetching Details of a Particular Person (GET /api/:user_id)

#### Request Format:

- Method: GET
- Endpoint: `/api/:user_id`

#### Response Format:

- Status Code: 200 (OK)
- Response Body:
  ```json
  {
    "_id": "user_id",
    "name": "person_name"
  }
  ```

### 4. Modifying Details of an Existing Person (PUT /api/:user_id)

#### Request Format:

- Method: PUT
- Endpoint: `/api/:user_id`
- Request Body:
  ```json
  {
    "name": "updated_name"
  }
  ```

#### Response Format:

- Status Code: 200 (OK)
- Response Body:
  ```json
  {
    "message": "name was successfully updated to updated_name.",
    "user_id": "user_id"
  }
  ```

### 5. Removing a Person (DELETE /api/:user_id)

#### Request Format:

- Method: DELETE
- Endpoint: `/api/:user_id`

#### Response Format:

- Status Code: 200 (OK)
- Response Body:
  ```json
  {
    "message": "user_id was successfully deleted."
  }
  ```

---

## Sample Usage

### Example 1: Fetching All Persons

#### Request:

- Method: GET
- Endpoint: `/api`

#### Response:

- Status Code: 200 (OK)
- Response Body:
  ```json
  [
    {
      "_id": "1",
      "name": "John Doe"
    },
    {
      "_id": "2",
      "name": "Jane Smith"
    }
  ]
  ```

### Example 2: Adding a New Person

#### Request:

- Method: POST
- Endpoint: `/api`
- Request Body:
  ```json
  {
    "name": "Alice Johnson"
  }
  ```

#### Response:

- Status Code: 201 (Created)
- Response Body:
  ```json
  {
    "message": "Alice Johnson was successfully created.",
    "user_id": "3"
  }
  ```

---

## Known Limitations and Assumptions

- The API assumes that MongoDB is running and accessible via the provided MongoDB connection URL in the `.env` file.

## Setting Up and Deploying the API

To set up and deploy the API, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/EzeibekweEmma/HNGx-Backend.git
   ```

2. Navigate to the project directory:

   ```shell
   cd ./HNGx-Backend/hngx-stage-two
   ```

3. Install dependencies:

   ```shell
   npm install
   ```

4. Create a `.env` file in the project root directory with your MongoDB connection URL:

   ```env
   MONGO_URL=your-mongodb-connection-url
   ```

5. Start the server:

   ```shell
   npm start
   ```

   The API will run on port 8888 by default.

---

Happy Coding! :smile:
