import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/user.model'

const loginRouter = express.Router()

loginRouter.post('/', async (request<>, response, next) => {
  cosnt user
})