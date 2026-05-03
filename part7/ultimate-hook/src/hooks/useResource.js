import { useEffect, useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then((res) => setResources(res.data))
  }, [baseUrl])

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource)
    setResources((current) => current.concat(res.data))
    return res.data
  }

  const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
    setResources((current) => current.filter((r) => r.id !== id))
  }

  return [resources, { create, remove }]
}
