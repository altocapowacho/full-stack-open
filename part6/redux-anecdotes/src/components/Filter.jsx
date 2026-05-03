import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer.js'

const Filter = () => {
  const dispatch = useDispatch()
  const value = useSelector((s) => s.filter)
  const style = { marginBottom: 10 }
  return (
    <div style={style}>
      filter <input value={value} onChange={(e) => dispatch(setFilter(e.target.value))} />
    </div>
  )
}

export default Filter
