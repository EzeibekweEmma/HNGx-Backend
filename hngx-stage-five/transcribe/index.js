const fs = require('fs')
const { execSync } = require('child_process')
const { Deepgram } = require('@deepgram/sdk')
const ffmpeg = require('ffmpeg-static')
require('dotenv').config()

// Deepgram Instance
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY)

// Function to run FFmpeg command synchronously
function runFFmpegCommand(command) {
  try {
    return execSync(`${ffmpeg} ${command}`)
  } catch (error) {
    console.log('ERROR', error)
    throw new Error(error)
  }
}

async function transcribeLocalVideo(filePath) {
  // Extracting the audio from the video using FFmpeg
  runFFmpegCommand(`-hide_banner -y -i ${filePath} ${filePath}.mp3`)

  // Read the extracted MP3 audio file
  const audioFile = {
    buffer: fs.readFileSync(`${filePath}.mp3`),
    mimetype: 'audio/mpeg',
  }

  try {
    const response = await deepgram.transcription.preRecorded(audioFile, {
      punctuation: true,
    })

    return response.results.channels[0].alternatives[0].transcript
  } catch (error) {
    console.error('Error during transcription:', error)
    throw new Error('Failed to transcribe audio')
  }
}

module.exports = transcribeLocalVideo
