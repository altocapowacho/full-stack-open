import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="author"
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
