import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Blog from '../models/blog_model'
import helper from './blog_api_helper'


import type { DbBlogType } from '../types/blog'

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    _id: "3a822bc61b54b897534d17fc",
    title: "Coffeee",
    author: "James Hoffman",
    url: "url here",
    likes: 1,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length+1)
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  assert.ok(blog.id, 'blog does not have id property')
  assert.strictEqual(blog._id, undefined, '_id should not be an attribute of the blog object')
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})


after(async () => {
  await mongoose.connection.close()
  console.log('connection closed')
})