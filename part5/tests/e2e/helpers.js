const BACKEND = process.env.BACKEND_URL ?? 'http://localhost:3003'

export const resetDatabase = async (request) => {
  await request.post(`${BACKEND}/api/testing/reset`)
}

export const createUser = async (request, user) => {
  await request.post(`${BACKEND}/api/users`, { data: user })
}

export const loginViaUI = async (page, { username, password }) => {
  await page.getByText('username').getByRole('textbox').fill(username)
  await page.getByText('password').locator('input').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

export const createBlogViaUI = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByPlaceholder('title').fill(title)
  await page.getByPlaceholder('author').fill(author)
  await page.getByPlaceholder('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page
    .getByText(`a new blog ${title} by ${author} added`)
    .waitFor({ state: 'visible' })
}
