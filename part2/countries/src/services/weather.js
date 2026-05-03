import axios from 'axios'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

export const getWeather = (city) => {
  if (!apiKey) {
    return Promise.reject(new Error('OpenWeatherMap API key not configured'))
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
  return axios.get(url).then((res) => res.data)
}
