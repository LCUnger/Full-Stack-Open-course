import type { ErrorRequestHandler } from "express"
import type { Request, Response } from "express"
import logger from "./logger"
import { error } from "console"

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error)
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicated key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export default { errorHandler, unknownEndpoint }