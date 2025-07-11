import dotenv from 'dotenv'
import logger from './logger'

dotenv.config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  logger.error('MONGODB_URI is not defined in the configuration')
  process.exit(1)
}

export default { PORT, MONGODB_URI }