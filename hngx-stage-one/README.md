# Stage One Task

This is a simple Node.js application using the Express framework to create a basic API. It responds take two GET request query parameters and return specific information in JSON format

## Introduction

This code demonstrates how to create a simple Node.js application using the [Express](https://expressjs.com/) framework. It sets up a basic API that responds to GET requests with JSON data containing information such as Slack name, current day, UTC time, and more. This project can serve as a starting point for building more complex Express-based applications.

#### Deployment Link

**[link]()**

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/ezeibekweEmma/HNGx-Backend.git
    ```

    Then, navigate to the `HNGx-Backend/hngx-stage-one` directory:

    ```bash
    cd HNGx-Backend/hngx-stage-one
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

    The server will start and listen on port 8888 by default. You can modify the port in the `const port` line in the code.

## Usage

After following the "Getting Started" steps, you can access the API by opening a web browser or making a GET request using tools like [cURL](https://curl.se/) or [Postman](https://www.postman.com/).

### API Endpoint

The API provides a single endpoint at `/api`. You can also provide query parameters to customize the response:

-   `slack_name`: The name to include in the response (default is "Ezeibekwe Emmanuel").
-   `track`: The track to include in the response (default is "backend").

Example API request with custom parameters:

```
http://localhost:8888/api?slack_name=JohnDoe&track=frontend
```

The response will be in JSON format, including information about the specified `slack_name` and `track`, as well as the current day and UTC time.

### Example Response

```json
{
    "slack_name": "JohnDoe",
    "current_day": "Monday",
    "utc_time": "2023-08-21T15:04:05.123Z",
    "track": "frontend",
    "github_file_url": "https://github.com/EzeibekweEmma/HNGx-Backend/blob/main/hngx-stage-one/index.js",
    "github_repo_url": "https://github.com/ezeibekweemma/HNGx-Backend",
    "status_code": 200
}
```
