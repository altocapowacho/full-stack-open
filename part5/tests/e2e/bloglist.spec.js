import { test, expect } from '@playwright/test'
import {
  resetDatabase,
  createUser,
  loginViaUI,
  createBlogViaUI,
} from './helpers.js'

const { describe, beforeEach } = test

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await resetDatabase(request)
    await createUser(request, {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    })
    await page.goto('/')
  })

  test('login form is shown by default', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginViaUI(page, { username: 'mluukkai', password: 'salainen' })
      await expect(
        page.getByText('Matti Luukkainen logged in'),
      ).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginViaUI(page, { username: 'mluukkai', password: 'wrong' })
      const error = page.getByText('wrong username or password')
      await expect(error).toBeVisible()
      await expect(error).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(
        page.getByText('Matti Luukkainen logged in'),
      ).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginViaUI(page, { username: 'mluukkai', password: 'salainen' })
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlogViaUI(page, {
        title: 'A first blog',
        author: 'E2E',
        url: 'https://example.com/first',
      })
      await expect(page.getByText('A first blog E2E')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlogViaUI(page, {
          title: 'Likeable post',
          author: 'E2E',
          url: 'https://example.com/like',
        })
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.locator('.likes-count')).toHaveText('1')
      })

      test('the creator can delete it', async ({ page }) => {
        page.on('dialog', (d) => d.accept())
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('Likeable post E2E')).not.toBeVisible()
      })

      test('a different user does not see the remove button', async ({
        page,
        request,
      }) => {
        await createUser(request, {
          username: 'other',
          name: 'Other user',
          password: 'secret',
        })
        await page.getByRole('button', { name: 'logout' }).click()
        await loginViaUI(page, { username: 'other', password: 'secret' })
        await page.getByRole('button', { name: 'view' }).click()
        await expect(
          page.getByRole('button', { name: 'remove' }),
        ).not.toBeVisible()
      })
    })

    describe('with several blogs', () => {
      beforeEach(async ({ page }) => {
        await createBlogViaUI(page, {
          title: 'Few likes',
          author: 'A',
          url: 'https://example.com/a',
        })
        await createBlogViaUI(page, {
          title: 'Most likes',
          author: 'B',
          url: 'https://example.com/b',
        })
        await createBlogViaUI(page, {
          title: 'Mid likes',
          author: 'C',
          url: 'https://example.com/c',
        })
      })

      test('blogs are sorted by likes descending', async ({ page }) => {
        const blogs = page.locator('.blog')

        // give "Most likes" 5 likes and "Mid likes" 2 likes
        const likeBlog = async (title, times) => {
          const blog = blogs.filter({ hasText: title })
          await blog.getByRole('button', { name: 'view' }).click()
          for (let i = 0; i < times; i++) {
            await blog.getByRole('button', { name: 'like' }).click()
            await expect(blog.locator('.likes-count')).toHaveText(`${i + 1}`)
          }
          await blog.getByRole('button', { name: 'hide' }).click()
        }

        await likeBlog('Most likes', 5)
        await likeBlog('Mid likes', 2)

        const summaries = await page.locator('.blog-summary').allTextContents()
        const titles = summaries.map((t) => t.split(' ').slice(0, 2).join(' '))
        expect(titles[0]).toContain('Most likes')
        expect(titles[1]).toContain('Mid likes')
        expect(titles[2]).toContain('Few likes')
      })
    })
  })
})
