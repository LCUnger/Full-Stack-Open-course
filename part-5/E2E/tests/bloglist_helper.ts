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

const login = async (page, user=testUser) => {
  await page.getByRole('textbox', { name: 'Username'}).fill(user.username)
  await page.getByRole('textbox', { name: 'Password'}).fill(user.password)
  await page.getByRole('button', { name: 'login'}).click()
}

const addBlog = async ( page, blog=testBlog ) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox', {name: 'Title'}).fill(blog.title)
      await page.getByRole('textbox', {name: 'Author'}).fill(blog.author)
      await page.getByRole('textbox', {name: 'URL'}).fill(blog.url)
      await page.getByRole('button', {name: 'Create'}).click()
      await page.getByText(`${blog.title} by ${blog.author}`).waitFor()
}

const extendBlog = async (page, blog) => {
  const displayedBlog = await page.getByText(`${blog.title} by ${blog.author}`).locator('..')
  const viewButton = await displayedBlog.getByRole('button', { name: 'view' })
  await viewButton.click()
}

export default { login, addBlog, extendBlog }