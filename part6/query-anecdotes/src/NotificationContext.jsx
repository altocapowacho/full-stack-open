import { createContext, useContext, useReducer, useRef } from 'react'

const NotificationContext = createContext(null)

const reducer = (state, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.payload
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [message, dispatch] = useReducer(reducer, '')
  const timeoutRef = useRef(null)

  const notify = (text, seconds = 5) => {
    dispatch({ type: 'SHOW', payload: text })
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
      timeoutRef.current = null
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ message, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotification must be used inside NotificationProvider')
  return ctx
}
