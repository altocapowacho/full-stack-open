import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notice, setNotice] = useState({ message: null, type: 'success' })

  useEffect(() => {
    personService.getAll().then(setPersons)
  }, [])

  const flash = (message, type = 'success') => {
    setNotice({ message, type })
    setTimeout(() => setNotice({ message: null, type: 'success' }), 4000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()
    if (!trimmedName || !trimmedNumber) return

    const existing = persons.find((p) => p.name === trimmedName)
    if (existing) {
      const replace = window.confirm(
        `${trimmedName} is already added to phonebook, replace the old number with a new one?`,
      )
      if (!replace) return

      personService
        .update(existing.id, { ...existing, number: trimmedNumber })
        .then((updated) => {
          setPersons(persons.map((p) => (p.id === existing.id ? updated : p)))
          flash(`Updated ${updated.name}`)
          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
          flash(
            `Information of ${trimmedName} has already been removed from server`,
            'error',
          )
          setPersons(persons.filter((p) => p.id !== existing.id))
        })
      return
    }

    personService
      .create({ name: trimmedName, number: trimmedNumber })
      .then((created) => {
        setPersons(persons.concat(created))
        flash(`Added ${created.name}`)
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        const msg =
          error?.response?.data?.error ?? 'Could not add person to server'
        flash(msg, 'error')
      })
  }

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) return
    personService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id))
        flash(`Deleted ${person.name}`)
      })
      .catch(() => {
        flash(`${person.name} was already removed from server`, 'error')
        setPersons(persons.filter((p) => p.id !== person.id))
      })
  }

  const filtered = filter
    ? persons.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase()),
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notice.message} type={notice.type} />
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />

      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={filtered} onDelete={deletePerson} />
    </div>
  )
}

export default App
