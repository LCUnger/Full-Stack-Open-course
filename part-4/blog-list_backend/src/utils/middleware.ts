import type { ErrorRequestHandler, NextFunction, RequestHandler } from "express"
import type { Request, Response } from "express"
import logger from "./logger"
import { error } from "console"
import { RequestWithToken } from "../types/token.types"

export class BackEndError extends Error {
  status: number;
  constructor (msg: string, status: number) {
    super(msg)
    this.status = status
    this.name = 'BackEndError'
  }
}


const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  logger.error(error)
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicated key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'BackEndError') {
    return response.status((error as BackEndError).status).json({error: error.message})
  }

  next(error)
}

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor: RequestHandler = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    (request as RequestWithToken).token = authorization.replace('Bearer ', '');
  }

  next();
};


export default { errorHandler, unknownEndpoint, tokenExtractor }