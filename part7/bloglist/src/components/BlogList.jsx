import { useState } from 'react'
import { Button, Collapse, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllBlogs } from '../services/blogs.js'
import BlogForm from './BlogForm.jsx'

const BlogList = () => {
  const [showForm, setShowForm] = useState(false)
  const result = useQuery({ queryKey: ['blogs'], queryFn: getAllBlogs })

  if (result.isLoading) return <p>loading blogs...</p>
  if (result.isError) return <p>could not load blogs</p>

  const sorted = [...result.data].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">blogs</h2>
        <Button
          variant={showForm ? 'secondary' : 'primary'}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'cancel' : 'create new blog'}
        </Button>
      </div>

      <Collapse in={showForm}>
        <div>
          <BlogForm onCreated={() => setShowForm(false)} />
        </div>
      </Collapse>

      <ListGroup>
        {sorted.map((b) => (
          <ListGroup.Item key={b.id} className="d-flex justify-content-between">
            <Link to={`/blogs/${b.id}`}>
              {b.title} <span className="text-muted">— {b.author}</span>
            </Link>
            <span className="badge bg-primary rounded-pill">{b.likes} likes</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default BlogList
