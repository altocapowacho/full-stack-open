import { useRef, useState } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Menu from './components/Menu.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import Anecdote from './components/Anecdote.jsx'
import About from './components/About.jsx'
import CreateNew from './components/CreateNew.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ])
  const [notification, setNotification] = useState('')

  const notifTimeout = useRef(null)
  const flash = (message) => {
    setNotification(message)
    if (notifTimeout.current) clearTimeout(notifTimeout.current)
    notifTimeout.current = setTimeout(() => setNotification(''), 10000)
  }

  const addNew = (anecdote) => {
    const created = { ...anecdote, id: String(Math.round(Math.random() * 1e9)) }
    setAnecdotes(anecdotes.concat(created))
    flash(`a new anecdote '${created.content}' created!`)
  }

  const match = useMatch('/anecdotes/:id')
  const selected = match
    ? anecdotes.find((a) => a.id === match.params.id)
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={selected} />} />
      </Routes>
    </div>
  )
}

export default App
