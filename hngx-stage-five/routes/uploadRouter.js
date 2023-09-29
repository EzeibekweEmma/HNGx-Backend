import express from 'express'
import {
  getVideos,
  serveVideo,
  uploadVideo,
} from '../controllers/uploadController.js'
import { storage } from '../lib/multer.js'

const router = express.Router()

router.post('/upload', storage.single('file'), uploadVideo)

// Get all videos from the database
router.get('/', getVideos)

// Serve a specific video by its ID
router.get('/:videoId', serveVideo)

export default router
