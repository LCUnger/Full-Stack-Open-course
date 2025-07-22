import { test, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/user_model'
import helper from './user_api.helper'

import type { UserEntryType, UserType } from '../types/user.types'

const api = supertest(app)


beforeEach(async () => {
  await User.deleteMany({})
  const hashedUsers = await helper.getInitialUsers()
  await User.insertMany(hashedUsers)
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

  const getResponse = await api.get('/api/users')
  const users = getResponse.body

  // assert.strictEqual(getResponse.body.length, helper.initialUsers.length+1, "The database didn't grow by one after the post request")
  
  const { password, ...expectedUser } = { ...newUser, id: postResponse.body.id }
  assert.deepStrictEqual(users.find((user: UserType) => user.id === expectedUser.id), expectedUser, 'The uploaded user is not found in the database')
})

after(async () => {
  await mongoose.connection.close()
  console.log('connection closed')
})

describe('entry validation', () => {
  describe('password validation', () => {
    test('password must be at least 3 characters long', async () => {
      const invalidUser: UserEntryType = {
        username: 'ShortPassUser',
        name: 'Test User',
        password: '12'
      }

      const response = await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.error, 'Password must be at least 3 characters long', 'Error message does not match expected validation error')
      })
  })

  describe('username validation', () => {
    test('user name must be at least 3 characters long', async () => {
      const invalidUser: UserEntryType = {
      username: 'ab',
      name: 'Test User',
      password: 'validPassword123'
      }

      const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.error, 'User validation failed: username: Path `username` (`ab`) is shorter than the minimum allowed length (3).', 'Error message does not match expected validation error')
    })
  })
})

