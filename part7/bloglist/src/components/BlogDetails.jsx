import { useState } from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addComment,
  getBlog,
  removeBlog,
  updateBlog,
} from '../services/blogs.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useNotification } from '../context/NotificationContext.jsx'

const BlogDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { notify } = useNotification()
  const queryClient = useQueryClient()
  const [comment, setComment] = useState('')

  const result = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id),
  })

  const likeMutation = useMutation({
    mutationFn: (blog) =>
      updateBlog(blog.id, {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user?.id ?? blog.user,
      }),
    onSuccess: (updated) => {
      queryClient.setQueryData(['blog', id], (prev) => ({
        ...updated,
        user: prev?.user ?? updated.user,
      }))
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.map((b) => (b.id === updated.id ? { ...updated, user: b.user } : b)),
      )
    },
  })

  const removeMutation = useMutation({
    mutationFn: (blogId) => removeBlog(blogId),
    onSuccess: () => {
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.filter((b) => b.id !== id),
      )
      notify(`removed ${result.data.title}`)
      navigate('/')
    },
    onError: (err) =>
      notify(err?.response?.data?.error ?? 'could not delete blog', 'error'),
  })

  const commentMutation = useMutation({
    mutationFn: (text) => addComment(id, text),
    onSuccess: (saved) => {
      queryClient.setQueryData(['blog', id], saved)
      setComment('')
    },
    onError: (err) =>
      notify(err?.response?.data?.error ?? 'could not add comment', 'error'),
  })

  if (result.isLoading) return <p>loading blog...</p>
  if (result.isError || !result.data) return <p>blog not found</p>

  const blog = result.data
  const ownerUsername = typeof blog.user === 'object' ? blog.user?.username : null
  const isOwner = ownerUsername && user?.username === ownerUsername

  const handleAddComment = (event) => {
    event.preventDefault()
    if (!comment.trim()) return
    commentMutation.mutate(comment.trim())
  }

  return (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
          <p>
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </p>
          <p>
            <strong>{blog.likes}</strong> likes{' '}
            <Button size="sm" onClick={() => likeMutation.mutate(blog)}>
              like
            </Button>
          </p>
          {ownerUsername && (
            <p className="text-muted">added by {ownerUsername}</p>
          )}
          {isOwner && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                if (window.confirm(`Remove blog ${blog.title}?`)) {
                  removeMutation.mutate(blog.id)
                }
              }}
            >
              remove
            </Button>
          )}
        </Card.Body>
      </Card>

      <h4>comments</h4>
      <Form onSubmit={handleAddComment} className="mb-3 d-flex gap-2">
        <Form.Control
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="add a comment"
        />
        <Button type="submit" disabled={commentMutation.isPending}>
          add comment
        </Button>
      </Form>

      <ListGroup>
        {blog.comments?.length ? (
          blog.comments.map((c, i) => <ListGroup.Item key={i}>{c}</ListGroup.Item>)
        ) : (
          <ListGroup.Item className="text-muted">no comments yet</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default BlogDetails
