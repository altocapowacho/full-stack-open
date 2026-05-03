import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes.js'
import { useNotification } from '../NotificationContext.jsx'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notify } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (old = []) => old.concat(newAnecdote))
      notify(`anecdote '${newAnecdote.content}' created`, 5)
    },
    onError: (err) => notify(err.message, 5),
  })

  const onSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>create new</h3>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
