import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/user_model'
import helper from './user_api_helper'

import type { UserEntryType, UserType } from '../types/user_types'

const api = supertest(app)


beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('a new user valid user can be added', async () => {
  const newUser: UserEntryType = {
    username: 'Luuk_Unger',
    name: 'Luuk Unger',
    password: 'LuukUnger11'
  }

  const postResponse = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
    const blogs = response.body
    assert.strictEqual(response.body.length, helper.initialUsers.length+1, "The database didn't grow by one after the post request")
    
    const expectedUser = { ...newUser, id: postResponse.body.id }
    assert.deepStrictEqual(blogs.find((user: UserType) => user.id === expectedUser.id), expectedUser, 'The uploaded user is not found in the database')
})

after(async () => {
  await mongoose.connection.close()
  console.log('connection closed')
})