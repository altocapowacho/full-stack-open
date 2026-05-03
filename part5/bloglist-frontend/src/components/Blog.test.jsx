import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Blog from './Blog.jsx'

const blog = {
  id: '1',
  title: 'Component testing is fun',
  author: 'Tester',
  url: 'https://example.com/test',
  likes: 4,
  user: { username: 'tester', name: 'Tester' },
}

describe('<Blog />', () => {
  test('renders title and author but not url or likes by default', () => {
    render(<Blog blog={blog} onLike={() => {}} onRemove={() => {}} />)

    expect(screen.getByText(/Component testing is fun/)).toBeInTheDocument()
    expect(screen.getByText(/Tester/)).toBeInTheDocument()
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(/likes/i)).toBeNull()
  })

  test('reveals url and likes when "view" is clicked', async () => {
    const user = userEvent.setup()
    render(<Blog blog={blog} onLike={() => {}} onRemove={() => {}} />)

    await user.click(screen.getByText('view'))

    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(/likes/i)).toBeInTheDocument()
  })

  test('clicking like twice fires the handler twice', async () => {
    const user = userEvent.setup()
    const handleLike = vi.fn()
    render(<Blog blog={blog} onLike={handleLike} onRemove={() => {}} />)

    await user.click(screen.getByText('view'))
    const likeBtn = screen.getByText('like')
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(handleLike).toHaveBeenCalledTimes(2)
  })
})
