# Stage Five Task

## Video Upload and Serving API

This is a simple Node.js and Express.js project for uploading and serving video files. It allows users to upload video files, store them on [Cloudinary](https://cloudinary.com/), and serve them through API endpoints.

### Table of Contents

- [Stage Five Task](#stage-five-task)
  - [Video Upload and Serving API](#video-upload-and-serving-api)
    - [Table of Contents](#table-of-contents)
    - [Features](#features)
    - [Getting Started](#getting-started)
    - [Usage](#usage)
      - [Uploading a Video](#uploading-a-video)
      - [Getting All Videos](#getting-all-videos)
      - [Serving a Specific Video](#serving-a-specific-video)
    - [API Endpoints](#api-endpoints)
    - [Dependencies](#dependencies)
    - [Contributing](#contributing)

### Features

- Upload video files to Cloudinary.
- Retrieve a list of all uploaded videos.
- Serve individual videos by their unique ID.

### Getting Started

Follow these steps to get the project up and running on your local machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/EzeibekweEmma/HNGx-Backend.git
   ```

2. Install dependencies:

   ```bash
   cd ./HNGx-Backend/hngx-stage-five
   npm install
   ```

3. Create a `.env` file in the project root and add your environment variables:

   ```dotenv
   PORT=8000
   MONGO_URL=your-mongodb-connection-url
   CLOUD_NAME=your-cloudinary-cloud-name
   API_KEY=your-cloudinary-api-key
   API_SECRET=your-cloudinary-api-secret
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

The server should now be running on `http://localhost:8000` (or your specified port).

### Usage

You can use this API to upload video files and serve them through API endpoints. Here's how to use the available endpoints:

#### Uploading a Video

- **Endpoint**: `POST /api/upload`
- **Request**: Send a POST request with a video file attached as `file` and provide additional data in the request body, such as `name` and `description`.
- **Response**: The uploaded video details, including the `name`, `url`, `cloudinary_id`, and `description`, will be returned in JSON format.

#### Getting All Videos

- **Endpoint**: `GET /api`
- **Response**: Retrieves a list of all uploaded videos in JSON format.

#### Serving a Specific Video

- **Endpoint**: `GET /api/:videoId`
- **Response**: Serves the video with the specified `videoId` in JSON format.

### API Endpoints

- `POST /api/upload`: Upload a video.
- `GET /api`: Get all videos.
- `GET /api/:videoId`: Serve a specific video by ID.

### Dependencies

This project uses the following main dependencies:

- `express`: Web application framework for Node.js.
- `mongoose`: MongoDB object modeling for Node.js.
- `cloudinary`: Cloudinary SDK for image and video management.
- `multer`: Middleware for handling file uploads.
- `dotenv`: Environment variable management.

### Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the usual GitHub fork, branch, and pull request workflow.
