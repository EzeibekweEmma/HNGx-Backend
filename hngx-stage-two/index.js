const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/person')
require('dotenv').config()
const app = express()
const port = 8888

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Unable to connect to MongoDB:', error)
  })

// routes
app.get('/', (req, res) => {
  res.json({ connection: 'Okay' })
})

// READ: Fetching all details
app.get('/api', async (req, res) => {
  try {
    const persons = await Person.find()
    res.status(200).json(persons)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
