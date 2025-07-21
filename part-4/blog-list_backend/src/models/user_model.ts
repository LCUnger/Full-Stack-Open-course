import mongoose, { mongo } from 'mongoose'
import type { Schema } from 'mongoose'

import type { DbUserType, UserType } from '../types/user_types'

mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema<DbUserType>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, _returnedObject) => {
    const { _id, username, name } = document.toObject()
    const obj = { id: _id.toString(), username, name }
    return obj
  }
})

const User = mongoose.model('User', userSchema)

export default User