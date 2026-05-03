const Notification = ({ message }) => {
  if (!message) return null
  const style = {
    border: 'solid 1px green',
    background: '#e6ffe6',
    color: 'green',
    padding: 10,
    margin: '10px 0',
  }
  return <div style={style}>{message}</div>
}

export default Notification
