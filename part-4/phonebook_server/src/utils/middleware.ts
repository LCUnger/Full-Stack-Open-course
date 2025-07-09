import type { Request, Response, NextFunction } from 'express'

import logger from './logger'

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id' })
    return
  }
  else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
    return
  }

  next(error)
}

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

export default { errorHandler, unknownEndpoint, requestLogger }