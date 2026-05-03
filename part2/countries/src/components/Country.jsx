import { useEffect, useState } from 'react'
import { getWeather } from '../services/weather.js'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState(null)

  useEffect(() => {
    if (!country?.capital?.[0]) return
    setWeather(null)
    setWeatherError(null)
    getWeather(country.capital[0])
      .then(setWeather)
      .catch((err) => setWeatherError(err.message))
  }, [country])

  const languages = country.languages
    ? Object.values(country.languages)
    : []

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital?.join(', ') ?? '—'}</p>
      <p>area: {country.area}</p>

      <h3>languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      {country.flags?.png && (
        <img
          src={country.flags.png}
          alt={country.flags.alt ?? `flag of ${country.name.common}`}
          width={160}
        />
      )}

      {country.capital?.[0] && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          {weatherError && <p style={{ color: 'red' }}>{weatherError}</p>}
          {weather && (
            <>
              <p>temperature {weather.main.temp} °C</p>
              {weather.weather?.[0]?.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              )}
              <p>wind {weather.wind.speed} m/s</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Country
