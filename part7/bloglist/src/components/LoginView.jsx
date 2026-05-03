import { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { login as loginRequest } from '../services/login.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useNotification } from '../context/NotificationContext.jsx'

const LoginView = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const { notify } = useNotification()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = await loginRequest({ username, password })
      login(data)
      setUsername('')
      setPassword('')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  return (
    <Container style={{ maxWidth: 420 }}>
      <Card>
        <Card.Body>
          <Card.Title className="mb-3">log in to application</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginView
