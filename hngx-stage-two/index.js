const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/person')
require('dotenv').config()
const app = express()
app.use(express.json())
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

// READ: Fetching all person details
app.get('/api', async (req, res) => {
  try {
    const persons = await Person.find()
    res.status(200).json(persons)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CREATE: Adding a new person
app.post('/api', async (req, res) => {
  try {
    const newPerson = await Person.create(req.body)
    res.status(201).json({
      message: `${newPerson.name} was successfully created.`,
      user_id: newPerson._id,
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// READ: Fetching details of a particular person
app.get('/api/:user_id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.user_id)
    if (!person) {
      // If the person with the given USER_ID is not found, return a 404 response
      return res.status(404).json({ error: 'user_id not found' })
    }
    res.status(200).json(person)
  } catch (err) {
    res.status(404).json({ error: 'user_id not found' })
  }
})

// UPDATE: Modifying details of an existing person
app.put('/api/:user_id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.user_id,
      { name: req.body.name },
      { new: true } // Return the updated document
    )

    if (!updatedPerson) {
      // If the person with the given user_id is not found, return a 404 response
      return res.status(404).json({ error: 'user_id not found' })
    }

    res.status(200).json({
      message: `name was successfully updated to ${updatedPerson.name}.`,
      user_id: updatedPerson._id,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE: Removing a person
app.delete('/api/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndRemove(req.params.id)

    if (!deletedPerson) {
      // If the person with the given ID is not found, return a 404 response
      return res.status(404).json({ error: 'user_id not found' })
    }

    res
      .status(200)
      .json({ message: req.params.id + ' was successfully deleted.' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
