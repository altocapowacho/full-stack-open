import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes.js'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes: (_state, action) => action.payload,
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    replaceAnecdote: (state, action) => {
      const updated = action.payload
      return state.map((a) => (a.id === updated.id ? updated : a))
    },
  },
})

export const { setAnecdotes, appendAnecdote, replaceAnecdote } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = (content) => async (dispatch) => {
  const created = await anecdoteService.create(content)
  dispatch(appendAnecdote(created))
}

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const updated = await anecdoteService.update({
    ...anecdote,
    votes: anecdote.votes + 1,
  })
  dispatch(replaceAnecdote(updated))
}

export default anecdoteSlice.reducer
