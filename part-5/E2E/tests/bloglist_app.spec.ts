import { test, expect, beforeEach, describe } from "@playwright/test"

import Blog from '../../blog-list_backend/src/models/blog.model'

import { testUser, testBlog, testUser2 } from "./bloglist_helper"
import helper from "./bloglist_helper"

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    const user1 = await request.post('http://localhost:3003/api/users', {
      data: testUser
    })

    await request.post('http://localhost:3003/api/users', {
      data: testUser2
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
      await helper.login(page)

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
      await helper.login(page)
    })

    test('a new blog can be created', async ({ page }) => {
      await helper.addBlog(page)

      await expect(page.getByText(`${testBlog.title} by ${testBlog.author}`)).toBeVisible()
    })

    describe('test blog functionality', () => {
      beforeEach(async ({ page}) => {
        await helper.addBlog(page)

      })

      test('blog can be expanded', async ({ page }) => {
         const viewButton = await page.getByRole('button', { name: 'view'})
         await expect(viewButton).toBeVisible()

         await viewButton.click()

         await expect(page.getByRole('button', {name: 'hide'})).toBeVisible()
      })

      test('blog can be liked', async ({ page }) => {
        await helper.extendBlog(page, testBlog)
        const likeButton = await page.getByRole('button', {name: "Like"})
        const likeDisplay = await page.locator('.likeDisplay')
        await expect(likeButton).toBeVisible()
        await expect(likeDisplay).toContainText('0')

        await likeButton.click()
        await expect(await likeButton.innerText()).toBe('Unlike')
        await expect(likeDisplay).toContainText('1')
      })

      test('only user who added blog can see delete button', async ({ page }) => {
        await helper.extendBlog(page, testBlog)
        await expect(page.getByRole('button', {name: 'remove'})).toBeVisible()

        await page.getByRole('button', {name: 'logout'}).click()
        await helper.login(page, testUser2)

        await helper.extendBlog(page, testBlog)
        await console.log(await page.locator('button', { hasText: 'remove' }))
        await expect(page.locator('button', { hasText: 'remove' })).toHaveCount(0)
      })
    })

    describe('tests with multiple blogs added', () => {
      beforeEach(async ({page, request}) => {
        await request.post('http://localhost:3003/api/testing/uplaod', {
          data: { helper.testBlogs },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ', // replace with actual token
          }
        })

      })
      test('blogs are ordered according to likes', async ({page}) => {
        const blogs = await page.locator('.blog').all()

        console.log('blogs', await blogs)

        for (const blog of blogs) {
          await helper.extendBlogEntry(blog)
        }

        await helper.likeExtendedBlog(blogs[2])

        await page.reload()

        // await helper.login(page)

        const blogsReloaded = await page.locator('.blog').all()

        console.log('test', await blogsReloaded)



        // const titlesReloaded = blogsReloaded.map(blog => {
        //   await blog.
        // })
      })
    })
  })
})