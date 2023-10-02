const express = require('express')
const AWS = require('aws-sdk')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

// Initialize AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-north-1',
})
const s3 = new AWS.S3()

// Mongoose setup - Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Define a Mongoose schema for videos
const videoSchema = new mongoose.Schema({
  sessionId: String,
  videoUrl: String,
  transcription: String,
})

// Create a Mongoose model
const Video = mongoose.model('Video', videoSchema)

// Array to accumulate video blobs
const videoChunks = {}

// Multer middleware to handle file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage })

app.get('/api', (req, res) => {
  res.send(
    '<h2>Hello 👋, list of end points, </br>GET api/videos </br>GET api/videos/:videoId </br>POST api/start-video </br>POST api/upload-chunk/:sessionId </br>POST api/finish-video/:sessionId </h2>'
  )
})

// Endpoint to get all videos
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find()
    res.status(200).json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    res.status(500).json({ message: 'Failed to fetch videos.' })
  }
})

// Endpoint to get a video by ID
app.get('/videos/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params
    const video = await Video.findById(videoId)

    if (!video) {
      return res.status(404).json({ message: 'Video not found.' })
    }

    res.status(200).json(video)
  } catch (error) {
    console.error('Error fetching video:', error)
    res.status(500).json({ message: 'Failed to fetch video.' })
  }
})

// Endpoint to start a new video session
app.post('/start-video', async (req, res) => {
  try {
    const sessionId = uuidv4()
    videoChunks[sessionId] = []

    // Create an S3 bucket for the session
    const bucketName = `video-session-${sessionId}`
    await s3.createBucket({ Bucket: bucketName }).promise()

    res.status(200).json({ sessionId })
  } catch (error) {
    console.error('Error starting video session:', error)
    res.status(500).json({ message: 'Failed to start video session.' })
  }
})

// Endpoint to upload video chunks
app.post(
  '/upload-chunk/:sessionId',
  upload.single('chunk'),
  async (req, res) => {
    try {
      const { sessionId } = req.params
      const { buffer } = req.file

      videoChunks[sessionId].push(buffer)

      // If enough chunks have been accumulated, upload to S3
      if (videoChunks[sessionId].length >= 3) {
        const videoBlob = Buffer.concat(videoChunks[sessionId])
        const bucketName = `video-session-${sessionId}`
        const videoKey = `${sessionId}.mp4`

        await s3
          .putObject({ Bucket: bucketName, Key: videoKey, Body: videoBlob })
          .promise()

        // Clear the array
        videoChunks[sessionId] = []

        res.status(200).json({ message: 'Chunk uploaded successfully.' })
      } else {
        res.status(200).json({ message: 'Chunk received.' })
      }
    } catch (error) {
      console.error('Error uploading video chunk:', error)
      res.status(500).json({ message: 'Failed to upload video chunk.' })
    }
  }
)

// Endpoint to finish the video session
app.post('/finish-video/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params

    // Transcribe the video using Deepgram
    const deepgramApiKey = process.env.DEEPGRAM_API_KEY
    const deepgramLanguage = 'en-US'
    const deepgramUrl = 'https://api.deepgram.com/v1/listen'

    const videoBucket = `video-session-${sessionId}`
    const videoKey = `${sessionId}.mp4`
    const videoUrl = `https://${videoBucket}.s3.amazonaws.com/${videoKey}`

    const deepgramResponse = await axios.post(
      deepgramUrl,
      {
        url: videoUrl,
        language: deepgramLanguage,
      },
      {
        headers: {
          Authorization: `Token ${deepgramApiKey}`,
        },
      }
    )

    const transcription = deepgramResponse.data.text

    // Save the transcription and video URL to MongoDB
    const video = new Video({
      sessionId,
      videoUrl,
      transcription,
    })
    await video.save()

    res
      .status(200)
      .json({ message: 'Video processing initiated.', transcription })
  } catch (error) {
    console.error('Error finishing video session:', error)
    res.status(500).json({ message: 'Failed to finish video session.' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
