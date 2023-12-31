const express = require('express')
const multer = require('multer')
const path = require('path')
const supabase = require('../utils/db')
const transcribeLocalVideo = require('../transcribe/index')
const ffmpegStatic = require('ffmpeg-static')

const router = express.Router()

// Create a directory for storing uploaded videos
const uploadDirectory = path.join(__dirname, '..', 'utils')

// Create a multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, uploadDirectory)
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname)
  },
})

// Create a multer instance
const upload = multer({ storage })

// Define an endpoint to handle video uploads
router.post('/', upload.single('video'), async (req, res) => {
  try {
    // Ensure that a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Store the URL in your Supabase database
    const { data, error } = await supabase
      .from('Videos')
      .insert([{ path: req.file.path, name: req.file.originalname }])

    if (error) {
      console.error('Error storing video in database:', error.message)
      return res.status(500).json({ error: 'Failed to store video' })
    }

    // Trigger transcription after storing the video
    try {
      const transcript = await transcribeLocalVideo(req.file.path)

      const { data, error } = await supabase
        .from('Videos')
        .update({ transcript: transcript })
        .eq('name', req.file.originalname)

      res.status(200).json({
        success: true,
        message: 'Video uploaded, stored, and transcribed',
      })
    } catch (transcriptionError) {
      console.error('Error during transcription:', transcriptionError)
      res.status(500).json({ error: 'Failed to transcribe video' })
    }
  } catch (err) {
    console.error('Error uploading video:', err.message)
    res.status(500).json({ error: 'Failed to upload video' })
  }
})

// Get all videos
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('Videos').select('name')

    if (error) {
      console.error('Error getting videos from database:', error.message)
      return res.status(500).json({ error: 'Failed to get videos' })
    }

    const videos = data.map((video) => video.name)

    res.status(200).json({ success: true, data: videos })
  } catch (err) {
    console.error('Error getting videos:', err.message)
    res.status(500).json({ error: 'Failed to get videos' })
  }
})

// get a specific video from supabase
const fs = require('fs')
router.get('/:filename', async (req, res) => {
  try {
    const filePath = path.join(uploadDirectory, req.params.filename)

    // Ensure that the file exists
    if (fs.existsSync(filePath)) {
      // set the appropriate content type
      res.setHeader('Content-Type', 'video/mp4')

      // Stream the video to the client
      const stream = fs.createReadStream(filePath)
      stream.pipe(res)
    } else {
      res.status(404).json({ error: 'File not found' })
    }
  } catch (err) {
    console.error('Error getting video:', err.message)
    res.status(500).json({ error: 'Failed to get video' })
  }
})

router.get('/transcript/:filename', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Videos')
      .select('transcript')
      .eq('name', req.params.filename)

    if (error) {
      console.error('Error getting transcript from database:', error.message)
      return res.status(500).json({ error: 'Failed to get transcript' })
    }

    const transcript = data[0].transcript

    res.status(200).json({ success: true, data: transcript })
  } catch (err) {
    console.error('Error getting transcript:', err.message)
    res.status(500).json({ error: 'Failed to get transcript' })
  }
})

module.exports = router
