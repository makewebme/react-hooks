import { useState, useEffect, useCallback } from 'react'

import './styles.css'
import { getRandomTodoRequest } from './api'


const App = () => {
  const [ todo, setTodo ] = useState('')
  const [ error, setError ] = useState<any>(null)
  const [ loading, setLoading ] = useState(false)
  const [ todoId, setTodoId ] = useState<any>(1)

  const getRandomTodo = useCallback(() => {
    setLoading(true)
    setError(null)

    getRandomTodoRequest(todoId)
      .then((res: any) => {
        setTodo(res?.title)
        setError(null)
      })
      .catch((error: any) => {
        setError(error)
        console.log(error)
      })
      .finally(() => setLoading(false))
  }, [ todoId ])

  useEffect(() => {
    getRandomTodo()
  }, [ todoId, getRandomTodo ])


  return (
    <div className='app'>
      {error ? <>
        <div >{error.message}</div>

        <button onClick={() => getRandomTodo()}>
          Try again
        </button>
      </> : <>
        {loading ? (
          <p className='todo-container'>
            Loading selected todo....
          </p>
        ) : (
          <p className='todo-container'>{todo}</p>
        )}

        <div>
          Input todo id (1-100):&nbsp;&nbsp;
          <input
            disabled={loading}
            onChange={(e: any) => setTodoId(e.target.value)}
            type='number'
            min={1}
            max={100}
            value={todoId}
          />
        </div>

        <button
          onClick={() => getRandomTodo()}
          disabled={loading}
        >
          Click to get todo by id
        </button>
      </>}
    </div>
  )
}

export default App
