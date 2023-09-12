# Stage Two Task

## Person API

The **Person API** is a simple RESTful API built with Node.js, Express, and MongoDB for managing person data. It provides basic CRUD (Create, Read, Update, Delete) operations for person entities.

---

## Getting Started

### Prerequisites

Before you can run the Person API, ensure you have the following software installed on your machine:

- Node.js: Download and install Node.js from [nodejs.org](https://nodejs.org/).
- MongoDB: Install MongoDB and make sure it's running on your local machine or provide a MongoDB connection URL.

### Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/EzeibekweEmma/HNGx-Backend.git
   ```

2. Navigate to the project directory:

   ```shell
   cd ./HNGx-Backend/hngx-stage-two
   ```

3. Install the project dependencies:

   ```shell
   npm install
   ```

4. Create a `.env` file in the project root directory and add your MongoDB connection URL:

   ```env
   MONGO_URL=your-mongodb-connection-url
   ```

---

## Usage

### Running the Server

To start the API server, run the following command:

```shell
npm start
```

<!-- TODO -->

The server will start on port 8888 by default. You can change the port by modifying the `port` variable in `index.js`.

### Endpoints

- **GET /api**: Fetches all person details.

- **POST /api**: Adds a new person.

  Example Request Body:

  ```json
  {
    "name": "John Doe"
  }
  ```

- **GET /api/:user_id**: Fetches details of a particular person by user_id.

- **PUT /api/:user_id**: Modifies details of an existing person by user_id.

  Example Request Body:

  ```json
  {
    "name": "Updated Name"
  }
  ```

- **DELETE /api/:id**: Removes a person by user_id.

For more information visit the [documentation page](./DOCUMENTATION.md).

---

### Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please open an issue or submit a pull request.
