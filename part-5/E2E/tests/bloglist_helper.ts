import type { Page } from "@playwright/test"

export const testUser = {
  name: "Test User",
  username: "test_user",
  password: "testing"
}

export const testUser2 = {
  name: "Second Test user",
  username: "test_user_2",
  password: "testing-as-well"
}

export const testBlog = {
  title: "TestBlog",
  author: "nobody",
  url: "example/test.com"
}

export const testBlogs = [
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Test Title 1",
    author: "Test Author One",
    url: "test-url-1",
    likes: 1,
    __v: 0,
    user: "687cef71832967f2c38f6b4f"
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "Test Title 2",
    author: "Test Author Two",
    url: "test-url-2",
    likes: 2,
    __v: 0,
    user: "687cef71832967f2c38f6b4f"
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Test Title 3",
    author: "Test Author Three",
    url: "test-url-3",
    likes: 3,
    __v: 0,
    user: "687cef71832967f2c38f6b4f"
  },
]

const login = async (page: Page, user = testUser) => {
  await page.getByRole('textbox', { name: 'Username'}).waitFor({ state: 'visible' })
  
  await page.getByRole('textbox', { name: 'Username'}).fill(user.username)
  await page.getByRole('textbox', { name: 'Password'}).fill(user.password)
  await page.getByRole('button', { name: 'login'}).click()
  
  await page.getByText(`${user.name} logged in`).waitFor({ state: 'visible' })
}

const addBlog = async (page:Page, blog=testBlog ) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox', {name: 'Title'}).fill(blog.title)
      await page.getByRole('textbox', {name: 'Author'}).fill(blog.author)
      await page.getByRole('textbox', {name: 'URL'}).fill(blog.url)
      await page.getByRole('button', {name: 'Create'}).click()
      await page.getByText(`${blog.title} by ${blog.author}`).waitFor()
}

const addBlogs = async (page: Page, blogs=testBlogs) => {
  for (const blog of blogs) {
    await addBlog(page, blog)
  }
}

const extendBlog = async (page:Page, blog) => {
  const displayedBlog = await page.getByText(`${blog.title} by ${blog.author}`).locator('..')
  const viewButton = await displayedBlog.getByRole('button', { name: 'view' })
  await viewButton.click()
}

const extendBlogEntry = async (blogLocator) => {
  const viewButton = await blogLocator.getByRole('button', { name: 'view' })
  await viewButton.click()
}

const likeExtendedBlog = async (blogLocator) => {
  await blogLocator.getByRole('button', { name: 'Like'}).click()
}

export default { login, addBlog, addBlogs, extendBlog, extendBlogEntry, likeExtendedBlog, testBlogs }