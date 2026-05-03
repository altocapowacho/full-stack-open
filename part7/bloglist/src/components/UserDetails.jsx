import { ListGroup } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../services/users.js'

const UserDetails = () => {
  const { id } = useParams()
  const result = useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) })

  if (result.isLoading) return <p>loading user...</p>
  if (result.isError || !result.data) return <p>user not found</p>

  const user = result.data
  return (
    <div>
      <h2>{user.name ?? user.username}</h2>
      <h4>added blogs</h4>
      {user.blogs?.length ? (
        <ListGroup>
          {user.blogs.map((b) => (
            <ListGroup.Item key={b.id}>
              <Link to={`/blogs/${b.id}`}>{b.title}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-muted">no blogs yet</p>
      )}
    </div>
  )
}

export default UserDetails
