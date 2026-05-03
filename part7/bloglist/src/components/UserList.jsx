import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../services/users.js'

const UserList = () => {
  const result = useQuery({ queryKey: ['users'], queryFn: getAllUsers })

  if (result.isLoading) return <p>loading users...</p>
  if (result.isError) return <p>could not load users</p>

  return (
    <div>
      <h2>Users</h2>
      <Table striped hover>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {result.data.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name ?? u.username}</Link>
              </td>
              <td>{u.blogs?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
