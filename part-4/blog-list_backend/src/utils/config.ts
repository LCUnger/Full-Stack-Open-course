import dotenv from 'dotenv'
import logger from './logger'

dotenv.config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const SECRET_KEY = process.env.SECRET_KEY

if (!MONGODB_URI) {
  logger.error('MONGODB_URI is not defined in the configuration')
  process.exit(1)
}

if (!PORT) {
  logger.error('PORT is not defined in the configuration')
  process.exit(1)
}

if (!SECRET_KEY) {
  logger.error('SECRET_KEY is not defined in the configuration')
  process.exit(1)
}



export default { PORT, MONGODB_URI, SECRET_KEY }