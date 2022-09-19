export type T_Error = { [k: string]: any } | null

export type T_AsyncFunction = (
  asyncFunction: (...args: any) => Promise<any>,
  args: any[],
  deps: any[],
  immediate: boolean
) => ({
  execute: () => void,
  res: any,
  error: T_Error,
  loading: boolean,
})
