import { test, after} from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a specific blog is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(e => e.content)
  
})


after(async () => {
  await mongoose.connection.close
})