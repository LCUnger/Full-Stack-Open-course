import type { ErrorRequestHandler, NextFunction, RequestHandler } from "express"
import type { Request, Response } from "express"
import jwt from 'jsonwebtoken'

import logger from "./logger"
import { error } from "console"
import config from "./config"
import User from "../models/user.model"

import type { TokenPayload } from "../types/token.types"
import { RequestWithUser } from "../types/request.types"


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

const tokenHandler: RequestHandler = async (request, _response, next) => {
  try {
    const authorization = request.get('authorization');

    let token: string | undefined

    if (authorization && authorization.startsWith('Bearer ')) {
      token = authorization.replace('Bearer ', '');
    }

    if (!token) throw new BackEndError('token missing or invalid scheme', 401);

    const decodedToken = jwt.verify(token, config.SECRET_KEY) as TokenPayload;

    if (!decodedToken.id) throw new BackEndError('token invalid', 401);

    const user = await User.findById(decodedToken.id);

    if (!user) throw new BackEndError('UserId missing or invalid', 400);

    (request as RequestWithUser).user = user
    next()
  } catch (error) {
    next(error)
  }
};


export default { errorHandler, unknownEndpoint, tokenHandler }