import { useState } from 'react'
import { useCountry, useField } from './hooks/index.js'

const Country = ({ country }) => {
  if (!country) return null
  if (!country.found) return <div>not found...</div>

  const { name, capital, population, flag } = country.data
  return (
    <div>
      <h3>{name}</h3>
      <div>capital {capital}</div>
      <div>population {population}</div>
      {flag && <img src={flag} height={100} alt={`flag of ${name}`} />}
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')

  const country = useCountry(name)

  const fetch = (event) => {
    event.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App
