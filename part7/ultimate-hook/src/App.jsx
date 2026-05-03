import { useField } from './hooks/useField.js'
import { useResource } from './hooks/useResource.js'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3001/notes')
  const [persons, personService] = useResource('http://localhost:3001/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button type="submit">create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>
          {n.content}{' '}
          <button onClick={() => noteService.remove(n.id)}>delete</button>
        </p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button type="submit">create</button>
      </form>
      {persons.map((p) => (
        <p key={p.id}>
          {p.name} {p.number}{' '}
          <button onClick={() => personService.remove(p.id)}>delete</button>
        </p>
      ))}
    </div>
  )
}

export default App
