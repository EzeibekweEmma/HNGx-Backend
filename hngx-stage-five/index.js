import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './routes/uploadRouter.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(bodyParser.json())
app.use(cors())

// Connect DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Unable to connect to MongoDB:', error)
  })

// Route
app.use('/api', routes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
