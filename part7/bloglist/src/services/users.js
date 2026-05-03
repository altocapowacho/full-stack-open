import axios from 'axios'

export const getAllUsers = async () => {
  const res = await axios.get('/api/users')
  return res.data
}

export const getUser = async (id) => {
  const res = await axios.get(`/api/users/${id}`)
  return res.data
}
