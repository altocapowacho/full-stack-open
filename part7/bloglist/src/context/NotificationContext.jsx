import { createContext, useContext, useReducer, useRef } from 'react'

const NotificationContext = createContext(null)

const reducer = (state, action) => {
  switch (action.type) {
  case 'SHOW':
    return { message: action.payload.message, variant: action.payload.variant }
  case 'CLEAR':
    return { message: '', variant: 'success' }
  default:
    return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { message: '', variant: 'success' })
  const timeoutRef = useRef(null)

  const notify = (message, variant = 'success', seconds = 5) => {
    dispatch({ type: 'SHOW', payload: { message, variant } })
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
      timeoutRef.current = null
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ ...state, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotification must be used inside NotificationProvider')
  return ctx
}
