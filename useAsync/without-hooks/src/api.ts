export const getRandomTodoRequest: any = async (todoId: any) => {
  const url = `https://jsonplaceholder.typicode.com/todos/${todoId}`
  return await fetch(url).then((res) => res.json())
}
