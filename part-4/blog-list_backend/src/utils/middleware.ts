import type { ErrorRequestHandler } from "express"
import type { Request, Response } from "express"
import logger from "./logger"
import { error } from "console"

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error)
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})

  }

  next(error)
}

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export default { errorHandler, unknownEndpoint }