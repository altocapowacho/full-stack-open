import { useEffect, useState } from 'react'
import { getAll } from './services/countries.js'
import Country from './components/Country.jsx'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getAll().then(setCountries)
  }, [])

  useEffect(() => {
    setSelected(null)
  }, [filter])

  if (!countries.length) {
    return <p>loading...</p>
  }

  const matches = filter
    ? countries.filter((c) =>
        c.name.common.toLowerCase().includes(filter.toLowerCase()),
      )
    : []

  let body
  if (selected) {
    body = <Country country={selected} />
  } else if (!filter) {
    body = null
  } else if (matches.length > 10) {
    body = <p>Too many matches, specify another filter</p>
  } else if (matches.length > 1) {
    body = (
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {matches.map((c) => (
          <li key={c.cca3}>
            {c.name.common}{' '}
            <button onClick={() => setSelected(c)}>show</button>
          </li>
        ))}
      </ul>
    )
  } else if (matches.length === 1) {
    body = <Country country={matches[0]} />
  } else {
    body = <p>No matches</p>
  }

  return (
    <div>
      <div>
        find countries:{' '}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      {body}
    </div>
  )
}

export default App
