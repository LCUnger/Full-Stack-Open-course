import type { ErrorRequestHandler } from "express"
import logger from "./logger"
import { error } from "console"

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error)
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})

  }

  next(error)
}

export default { errorHandler }