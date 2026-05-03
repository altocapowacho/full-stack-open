import axios from 'axios'

const baseUrl = '/api/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (content) => {
  const res = await axios.post(baseUrl, { content, votes: 0 })
  return res.data
}

const update = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return res.data
}

export default { getAll, create, update }
