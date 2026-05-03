import { useEffect, useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => setValue(event.target.value)
  return { type, value, onChange }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }

    let cancelled = false
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`

    axios
      .get(url)
      .then((res) => {
        if (cancelled) return
        const c = res.data[0]
        setCountry({
          found: true,
          data: {
            name: c.name.common,
            capital: c.capital?.[0] ?? '—',
            population: c.population,
            flag: c.flags?.png,
          },
        })
      })
      .catch(() => {
        if (!cancelled) setCountry({ found: false })
      })

    return () => {
      cancelled = true
    }
  }, [name])

  return country
}
