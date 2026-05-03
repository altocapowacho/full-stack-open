import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification: (_state, action) => action.payload,
    clearNotification: () => '',
  },
})

export const { showNotification, clearNotification } = notificationSlice.actions

let activeTimeout = null

export const setNotification = (message, seconds) => (dispatch) => {
  dispatch(showNotification(message))
  if (activeTimeout) clearTimeout(activeTimeout)
  activeTimeout = setTimeout(() => {
    dispatch(clearNotification())
    activeTimeout = null
  }, seconds * 1000)
}

export default notificationSlice.reducer
