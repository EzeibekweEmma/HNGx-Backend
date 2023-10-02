# Stage Five Task

## Video Processing Server

This Node.js server provides an API for recording, uploading, transcribing, and storing videos using AWS S3, Deepgram, and MongoDB. It's designed to handle video recording from a frontend application.

### Prerequisites

Before running the server, ensure you have the following:

- Node.js and npm installed on your machine.
- An AWS S3 account with access credentials (AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY).
- A Deepgram account with an API key (DEEPGRAM_API_KEY).
- MongoDB installed and running, or access to a MongoDB database.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/EzeibekweEmma/HNGx-Backend.git
   cd ./HNGx-Backend/hngx-stage-five
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root directory and add the following environment variables:

   ```dotenv
   PORT=3000
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   DEEPGRAM_API_KEY=your_deepgram_api_key
   MONGO_URL=your_mongodb_connection_string
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server should now be running on the specified port (default is 3000).

## API Endpoints

#### Start a New Video Session

- **Endpoint:** POST `/start-video`
- **Description:** Initiates a new video recording session and creates an S3 bucket for storing video chunks.
- **Response:** A JSON object containing the `sessionId` for the new session.

#### Upload Video Chunks

- **Endpoint:** POST `/upload-chunk/:sessionId`
- **Description:** Uploads video chunks to the server. Video chunks are accumulated in memory until enough data is received to upload to S3.
- **Request Body:** Video chunk data (multipart/form-data).
- **Response:** JSON response indicating successful upload or chunk received.

### Get All Videos

- **Endpoint:** GET /videos
- **Description:** Retrieves all videos stored in the MongoDB database.
- **Response:** A JSON array of video objects.

### Get Video by ID

- **Endpoint:** GET /videos/:videoId
- **Description:** Retrieves a specific video by its unique ID.
- **Response:** A JSON object representing the video.

#### Finish Video Session

- **Endpoint:** POST `/finish-video/:sessionId`
- **Description:** Transcribes the video using Deepgram, saves the transcription and video URL to MongoDB, and completes the video processing.
- **Response:** A JSON object confirming video processing initiation.

### Frontend Integration

To use this server with a frontend application for video recording and processing, follow these steps:

1. Set up your frontend application to capture and send video data to the server as video chunks using the `/upload-chunk/:sessionId` endpoint.

2. Start a new video session using the `/start-video` endpoint when the user initiates video recording. Save the `sessionId` returned by the server.

3. Continuously send video chunks to the server as they are recorded.

4. When video recording is complete, send a request to the `/finish-video/:sessionId` endpoint, including the `sessionId`. The server will transcribe the video using Deepgram, save the transcription and video URL to MongoDB, and provide a response confirming video processing initiation.

5. You can later retrieve video data, including transcriptions, from the MongoDB database.

---

This README provides an overview of the video processing server and instructions on how to set it up and integrate it with a frontend application. Make sure to replace placeholders like `your_aws_access_key_id` with your actual credentials and customize the frontend integration as needed.
