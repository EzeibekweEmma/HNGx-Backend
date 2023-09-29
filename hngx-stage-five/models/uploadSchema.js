import mongoose from 'mongoose'

const uploadSchema = new mongoose.Schema({
  name: String,
  url: { type: String, required: true },
  cloudinary_id: String,
  description: String,
})

const Upload = mongoose.model('Upload', uploadSchema)
export default Upload
