import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    if (!content) return
    event.target.anecdote.value = ''
    await dispatch(createAnecdote(content))
    dispatch(setNotification(`new anecdote added: '${content}'`, 5))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
