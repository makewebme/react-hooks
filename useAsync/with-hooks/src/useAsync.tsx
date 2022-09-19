import { useCallback, useEffect, useRef, useState } from 'react'

import { T_AsyncFunction, T_Error } from './types'


const useAsync: T_AsyncFunction = (
  asyncFunction,
  args = [],
  deps = [],
  immediate = true,
) => {
  const isFirstUpdate = useRef(true)

  const [ res, setRes ] = useState<any>(null)
  const [ error, setError ] = useState<T_Error>(null)
  const [ loading, setLoading ] = useState<boolean>(false)

  const execute: () => void = useCallback(() => {
    setLoading(true)
    setRes(null)
    setError(null)

    return asyncFunction(...args)
      .then((res: any) => setRes(res))
      .catch((error: any) => setError(error))
      .finally(() => setLoading(false))
  }, [ asyncFunction, args ])

  useEffect(() => {
    if (immediate) {
      execute()
    } else {
      if (!isFirstUpdate.current) {
        execute()
      }
    }
  // eslint-disable-next-line
  }, [ ...deps ])

  useEffect(() => {
    isFirstUpdate.current = false
  }, [])

  return { execute, res, error, loading }
}

export default useAsync
