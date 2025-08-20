export const testUser = {
  name: "Test User",
  username: "test_user",
  password: "testing"
}

export const testBlog = {
  title: "TestBlog",
  author: "nobody",
  url: "example/test.com"
}

const login = async (page) => {
  await page.getByRole('textbox', { name: 'Username'}).fill(testUser.username)
  await page.getByRole('textbox', { name: 'Password'}).fill(testUser.password)
  await page.getByRole('button', { name: 'login'}).click()
}

export default { login }