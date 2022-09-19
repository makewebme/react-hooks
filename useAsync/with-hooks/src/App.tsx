import React, { useState } from 'react'

import './styles.css'
import useAsync from './useAsync'
import { getRandomTodoRequest } from './api'


const App = () => {
  const [ todoId, setTodoId ] = useState<number>(1)

  const { execute, res, error, loading } = useAsync(
    getRandomTodoRequest,
    [ todoId ],
    [ todoId ],
    true
  )


  return (
    <div className='app'>
      {error ? <>
        <div>{error.message}</div>

        <button onClick={() => execute()}>
          Fetch again
        </button>
      </> : <>
        {loading ? (
          <p className='todo-container'>
            Loading...
          </p>
        ) : (
          <p className='todo-container'>{res?.title}</p>
        )}

        <div>
          Input todo id (1-100):&nbsp;&nbsp;
          <input
            disabled={loading}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoId(+e.target.value)}
            type='number'
            value={todoId}
          />
        </div>

        <button
          onClick={() => execute()}
          disabled={loading}
        >
          Get todo by id
        </button>
      </>}
    </div>
  )
}

export default App
