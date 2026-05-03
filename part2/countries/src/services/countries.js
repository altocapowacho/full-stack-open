import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

export const getAll = () => axios.get(`${baseUrl}/all`).then((res) => res.data)

export const getByName = (name) =>
  axios.get(`${baseUrl}/name/${name}`).then((res) => res.data)
