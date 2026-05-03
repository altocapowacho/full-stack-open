import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 10,
  border: 'solid 1px #ccc',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, onLike, onRemove, currentUsername }) => {
  const [visible, setVisible] = useState(false)

  const handleLike = () => {
    onLike({ ...blog, likes: blog.likes + 1, user: blog.user?.id ?? blog.user })
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      onRemove(blog)
    }
  }

  const ownerUsername =
    typeof blog.user === 'object' ? blog.user?.username : null
  const isOwner = ownerUsername && currentUsername === ownerUsername

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        {blog.title} {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            likes <span className="likes-count">{blog.likes}</span>{' '}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{ownerUsername}</div>
          {isOwner && (
            <button onClick={handleRemove} style={{ background: '#ff5555' }}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
