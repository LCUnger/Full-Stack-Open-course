import express, { Request, Response, NextFunction } from 'express'
import { UserEntryType } from '../types/user_types'
import bcrypt from 'bcrypt'
import User from '../models/user_model'


const userRouter = express.Router()

userRouter.post('/', async (request: Request<{},{},UserEntryType>, response, next: NextFunction) => {
  try {
    const userEntry = request.body

    const saltRounds = 10
    const passwordhash = await bcrypt.hash(userEntry.password, saltRounds)

    const user = new User({
      username: userEntry.username,
      name: userEntry.name,
      passwordHash: passwordhash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users)
  } catch (error) {
    next(error)
  }
})

export default userRouter