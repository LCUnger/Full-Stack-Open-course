import express, { Request, Response, NextFunction } from 'express'
import { UserEntryType } from '../types/user.types'
import bcrypt from 'bcrypt'
import User from '../models/user.model'


const userRouter = express.Router()

userRouter.post('/', async (request: Request<{}, {}, UserEntryType>, response, next: NextFunction) => {
  try {
    const { username, name, password } = request.body;

    // Validate password length
    if (!password || password.length < 3) {
      return response.status(400).json({ error: 'Password must be at least 3 characters long' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
})

userRouter.get('/', async (_request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {title: 1, author:1, url:1})
    response.json(users)
  } catch (error) {
    next(error)
  }
})

export default userRouter