declare global {
  var token: string;
  var test_user: {
    _id: string;
    username: string;
    name: string;
    passwordHash: string;
  };
}

import { test, after, beforeEach, before } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import bcrypt from 'bcrypt'

import app from '../app'
import Blog from '../models/blog.model'
import helper from './blog_api.helper'


import type { BlogJsonType, BlogType } from '../types/blog.types'
import User from '../models/user.model';

const api = supertest(app)

before(async () => {
  const test_user_login = {
    username: 'test_user',
    password: 'testing'
  }

  global.test_user = {
    _id: '507f1f77bcf86cd799439011',
    username: 'test_user',
    name: 'test',
    passwordHash: await bcrypt.hash(test_user_login.password, 10)
  }

  await User.deleteMany({})

  const test_user = global.test_user
  await User.insertOne(test_user);

  const token_response = await api
    .post('/api/login')
    .send({username: test_user.username, password: test_user_login.password})
  global.token = token_response.body.token

  if (!token) {
    console.error('No token!')
    process.exit(1)
  }
  
})


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
    .set('Authorization', `Bearer ${global.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body
  assert.strictEqual(response.body.length, helper.initialBlogs.length+1)


  

  const expectedBlog = { ...newBlog, id: post.body.id, user: {_id: global.test_user._id, username: global.test_user.username, name: global.test_user.name } }
  assert.deepStrictEqual(blogs.find((blog: BlogJsonType) => blog.id === expectedBlog.id), expectedBlog, 'The uploaded blog is not found in the database')
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
    .set('Authorization', `Bearer ${global.token}`)
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
    .set('Authorization', `Bearer ${global.token}`)
    .send(blogWithoutTitle)
    .expect(400)

  try {
    const responseNoUrl = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${global.token}`)
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
    .set('Authorization', `Bearer ${global.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const deleteResponse = await api
    .delete(`/api/blogs/${postResponse.body.id}`)
    .set('Authorization', `Bearer ${global.token}`)
    .expect(204)

  const getResponse = await api
    .get('/api/blogs')

  const blogs = getResponse.body

  assert.strictEqual(
    blogs.find((blog: BlogJsonType) => blog.id === postResponse.body.id),
    undefined,
    'The deleted blog is still present in the database')
  
})

after(async () => {
  await mongoose.connection.close()
  console.log('connection closed')
})