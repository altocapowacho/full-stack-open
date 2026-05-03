import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField.js'

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  // 7.6 — strip `reset` so it does not propagate to the DOM input
  const fieldProps = ({ type, value, onChange }) => ({ type, value, onChange })

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...fieldProps(content)} name="content" />
        </div>
        <div>
          author
          <input {...fieldProps(author)} name="author" />
        </div>
        <div>
          url for more info
          <input {...fieldProps(info)} name="info" />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
