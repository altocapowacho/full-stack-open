import { Alert, Container } from 'react-bootstrap'
import { useNotification } from '../context/NotificationContext.jsx'

const NotificationBanner = () => {
  const { message, variant } = useNotification()
  if (!message) return null
  return (
    <Container>
      <Alert variant={variant === 'error' ? 'danger' : 'success'}>{message}</Alert>
    </Container>
  )
}

export default NotificationBanner
