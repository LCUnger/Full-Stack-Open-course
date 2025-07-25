import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/user.model'
import { LoginEntryType } from '../types/login.types'
import config from '../utils/config'

const loginRouter = express.Router()

loginRouter.post('/', async (request: Request<{}, {}, LoginEntryType>, response, next) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({error: 'invalid username or password'})
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET_KEY)

  response.status(200).send({ token, username: user.username, name: user.name })
})

export default loginRouter