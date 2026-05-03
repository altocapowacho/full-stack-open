import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../services/anecdotes.js'
import { useNotification } from '../NotificationContext.jsx'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const { notify } = useNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updated) => {
      queryClient.setQueryData(['anecdotes'], (old = []) =>
        old.map((a) => (a.id === updated.id ? updated : a)),
      )
      notify(`you voted '${updated.content}'`, 5)
    },
  })

  if (result.isLoading) return <div>loading data...</div>
  if (result.isError) return <div>anecdote service not available due to problems in server</div>

  const sorted = [...result.data].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sorted.map((a) => (
        <div key={a.id} style={{ marginBottom: 6 }}>
          <div>{a.content}</div>
          <div>
            has {a.votes}{' '}
            <button onClick={() => voteMutation.mutate({ ...a, votes: a.votes + 1 })}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
