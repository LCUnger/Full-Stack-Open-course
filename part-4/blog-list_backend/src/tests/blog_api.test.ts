import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Blog from '../models/blog_model'
import helper from './blog_api.helper'


import type { BlogType } from '../types/blog_types'

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Coffeee",
    author: "James Hoffman",
    url: "url here",
    likes: 1,
  }
  const post = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body
  assert.strictEqual(response.body.length, helper.initialBlogs.length+1)
  
  const expectedBlog = { ...newBlog, id: post.body.id, user: post.body.user }
  assert.deepStrictEqual(blogs.find((blog: BlogType) => blog.id === expectedBlog.id), expectedBlog, 'The uploaded blog is not found in the database')
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('likes property of added blog defaults to 0 if not given', async () => {
  const newBlog = {
    title: "Coffeee",
    author: "James Hoffman",
    url: "url here",
  }

  const post = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const postedBlog = post.body
  assert.strictEqual(postedBlog.likes, 0, "The uploaded blog without a like property didn't default to 0")
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  assert.ok(blog.id, 'blog does not have id property')
  assert.strictEqual(blog._id, undefined, '_id should not be an attribute of the blog object')
})

test('test if creating a new blog without title or url responds with status code 400 bad request', async () => {
  const blogWithoutTitle = {
    author: "James Hoffman",
    url: "example.com"
  }

  const blogWithoutUrl ={
    title: "Coffee",
    author: "James Hoffman",
  }

  const responseNoTitle = await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  try {
    const responseNoUrl = await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  } catch (error:any) {
    console.log("error: ",error.name as any)
  }
})

test('delete existing item', async () => {
  const newBlog = {
    title: "Coffeee",
    author: "James Hoffman",
    url: "url here",
    likes: 1,
  }
  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const deleteResponse = await api
    .delete(`/api/blogs/${postResponse.body.id}`)
    .expect(204)

  const getResponse = await api
    .get('/api/blogs')

  const blogs = getResponse.body

  assert.strictEqual(
    blogs.find((blog: BlogType) => blog.id === postResponse.body.id),
    undefined,
    'The deleted blog is still present in the database')
  
})

after(async () => {
  await mongoose.connection.close()
  console.log('connection closed')
})