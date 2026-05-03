import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null
export const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null
}

const authHeaders = () => (token ? { Authorization: token } : {})

export const getAllBlogs = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const getBlog = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

export const createBlog = async (blog) => {
  const res = await axios.post(baseUrl, blog, { headers: authHeaders() })
  return res.data
}

export const updateBlog = async (id, blog) => {
  const res = await axios.put(`${baseUrl}/${id}`, blog)
  return res.data
}

export const removeBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers: authHeaders() })
}

export const addComment = async (id, comment) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return res.data
}
