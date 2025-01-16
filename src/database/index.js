import mongoose from 'mongoose'
import {MONGODB_URI} from '../utils/config.js'
import {info, error} from '../utils/logger.js'

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
    })
    info('Connected to MongoDB')
  } catch (err) {
    error('Error connecting to MongoDB:', err.message)
  }
}

export default dbConnection