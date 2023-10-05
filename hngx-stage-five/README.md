# Stage Five Task

## Video Upload and Transcription Service

### Chrome Video Recording Extension

This repository contains a Node.js application that provides a service for uploading videos, storing them in a database, and transcribing their audio content. It utilizes Express.js for creating a web server, Multer for handling file uploads, Supabase for database operations, FFmpeg for audio extraction, and Deepgram for audio transcription.

### Prerequisites

Before running the application, make sure you have the following prerequisites installed:

- Node.js and npm: [Download and install Node.js](https://nodejs.org/).
- FFmpeg: [Download FFmpeg](https://www.ffmpeg.org/download.html) and ensure it's in your system's PATH.

### Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/EzeibekweEmma/HNGx-Backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ./HNGx-Backend/hngx-stage-five
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and add your Deepgram API key:

   ```env
   DEEPGRAM_API_KEY=your_deepgram_api_key_here
   ```

5. Configure Supabase:

   - Set up a Supabase project and create a new table named "Videos" with the following columns:
     - `id` (bigint, primary key)
     - `created_at` (timestamp with time zone, not null, default now())
     - `name` (character varying)
     - `path` (character varying)
     - `transcript` (text)
   - Update the Supabase connection details in `utils/db.js` to match your project.

6. Start the application:

   ```bash
   npm start
   ```

The application should now be running on `http://localhost:3000`.

### Usage

#### Uploading Videos

To upload a video, make a POST request to `http://localhost:3000/api` with the video file attached as a `video` field in the form-data. The server will store the video in the specified directory and add its information to the database.

#### Retrieving Videos

To retrieve a list of all uploaded videos, make a GET request to `http://localhost:3000/api`. The server will respond with a JSON array of video names.

Example using cURL:

```bash
curl http://localhost:3000/api
```

#### Retrieving Video Transcript

To retrieve the transcript of a specific video, make a GET request to `http://localhost:3000/api/transcript/:filename`, where `:filename` is the name of the video. The server will respond with the transcript text if available.

Example using cURL:

```bash
curl http://localhost:3000/api/transcript/video.mp4
```

#### Accessing Video Files

To access a specific video file, make a GET request to `http://localhost:3000/api/:filename`, where `:filename` is the name of the video. The server will stream the video file to the client.

Example using a web browser:

```
http://localhost:3000/api/video.mp4
```
