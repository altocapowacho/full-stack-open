import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlog } from '../services/blogs.js'
import { useNotification } from '../context/NotificationContext.jsx'

const BlogForm = ({ onCreated }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const queryClient = useQueryClient()
  const { notify } = useNotification()

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (created) => {
      queryClient.setQueryData(['blogs'], (old = []) => old.concat(created))
      notify(`a new blog ${created.title} by ${created.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      onCreated?.()
    },
    onError: (err) =>
      notify(err?.response?.data?.error ?? 'could not create blog', 'error'),
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    mutation.mutate({ title, author, url })
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>create new</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>title</Form.Label>
            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>author</Form.Label>
            <Form.Control value={author} onChange={(e) => setAuthor(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>url</Form.Label>
            <Form.Control value={url} onChange={(e) => setUrl(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={mutation.isPending}>
            create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default BlogForm
