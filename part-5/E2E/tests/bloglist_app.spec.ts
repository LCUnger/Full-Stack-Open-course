import { test, expect, beforeEach, describe } from "@playwright/test"

import { testUser, testBlog } from "./bloglist_helper"
import helper from "./bloglist_helper"

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: testUser
    })


    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Username:')).toBeVisible()
    await expect(page.getByText('Password:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('login successfully', async ({ page }) => {
      helper.login(page)

      await expect(page.getByText(`${testUser.name} logged in`)).toBeVisible()
    })

    test('login unsuccessfully', async ({ page }) => {
      await page.getByRole('textbox', { name: 'Username'}).fill(testUser.username)
      await page.getByRole('textbox', { name: 'Password'}).fill('wrong password')
      await page.getByRole('button', { name: 'login'}).click()

      await expect(page.getByText(`invalid username or password`)).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      helper.login(page)
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox', {name: 'Title'}).fill(testBlog.title)
      await page.getByRole('textbox', {name: 'Author'}).fill(testBlog.author)
      await page.getByRole('textbox', {name: 'URL'}).fill(testBlog.url)
      await page.getByRole('button', {name: 'Create'}).click()

      await expect(page.getByText(`${testBlog.title} by ${testBlog.author}`)).toBeVisible()
    })

    test('blog can be liked')
  })
})