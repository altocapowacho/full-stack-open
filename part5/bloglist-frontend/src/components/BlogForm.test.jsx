import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm.jsx'

test('<BlogForm /> calls createBlog with the right data on submit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)

  await user.type(screen.getByPlaceholderText('title'), 'New title')
  await user.type(screen.getByPlaceholderText('author'), 'Some author')
  await user.type(screen.getByPlaceholderText('url'), 'https://example.com/x')
  await user.click(screen.getByText('create'))

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'New title',
    author: 'Some author',
    url: 'https://example.com/x',
  })
})
