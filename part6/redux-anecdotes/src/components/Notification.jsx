import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((s) => s.notification)
  if (!message) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    background: '#e6ffe6',
    color: 'green',
  }
  return <div style={style}>{message}</div>
}

export default Notification
