import { useDispatch, useSelector } from 'react-redux'

const Statistics = ({ good, ok, bad }) => {
  const total = good + ok + bad
  if (total === 0) return <p>No feedback given</p>
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>ok</td>
          <td>{ok}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const { good, ok, bad } = useSelector((s) => s)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>neutral</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>

      <h2>statistics</h2>
      <Statistics good={good} ok={ok} bad={bad} />
    </div>
  )
}

export default App
