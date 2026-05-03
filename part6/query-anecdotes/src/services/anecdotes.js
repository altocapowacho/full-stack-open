import axios from 'axios'

const baseUrl = '/api/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then((r) => r.data)

export const createAnecdote = (content) => {
  if (content.length < 5) {
    return Promise.reject(new Error('too short anecdote, must have length 5 or more'))
  }
  return axios.post(baseUrl, { content, votes: 0 }).then((r) => r.data)
}

export const updateAnecdote = (anecdote) =>
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then((r) => r.data)
