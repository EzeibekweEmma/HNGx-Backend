import Upload from '../models/uploadSchema.js'
import cloudinary from '../lib/cloudinary.js'

// upload video
export const uploadVideo = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video',
      folder: 'chrome-video-extension',
    })

    const upload = new Upload({
      name: req.body.name?.trim(),
      url: result.secure_url,
      cloudinary_id: result.public_id,
      description: req.body.description?.trim(),
    })

    const savedUpload = await upload.save()

    res.status(200).json(savedUpload)
  } catch (error) {
    console.error('Error uploading video to Cloudinary:', error)
    res.status(500).json({ message: 'Failed to upload video to Cloudinary.' })
  }
}

// Get all videos from the database
export const getVideos = async (req, res) => {
  try {
    const videos = await Upload.find()
    res.status(200).json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    res.status(500).json({ message: 'Failed to fetch videos.' })
  }
}

// Serve a specific video by its ID
export const serveVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId

    // Fetch the video by its unique identifier
    const video = await Upload.findById(videoId)

    if (!video) {
      return res.status(404).json({ message: 'Video not found.' })
    }

    res.status(200).json(video)
  } catch (error) {
    console.error('Error serving video:', error)
    res.status(500).json({ message: 'Failed to serve video.' })
  }
}
