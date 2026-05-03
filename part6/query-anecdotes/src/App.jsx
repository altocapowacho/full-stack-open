import AnecdoteList from './components/AnecdoteList.jsx'
import AnecdoteForm from './components/AnecdoteForm.jsx'
import Notification from './components/Notification.jsx'

const App = () => (
  <div>
    <h2>Anecdotes (React Query)</h2>
    <Notification />
    <AnecdoteList />
    <AnecdoteForm />
  </div>
)

export default App
