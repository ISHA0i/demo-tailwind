import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, createTodo, deleteTodo, patchTodo } from './api/todos'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import Card from './components/ui/Card'
import Checkbox from './components/ui/Checkbox'
import { useTodoContext } from './context/TodoContext'

function App() {
  const [text, setText] = useState('')
  const { filter } = useTodoContext()
  const queryClient = useQueryClient()

  const { data: todos = [], isLoading } = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  const createMutation = useMutation({
    mutationFn: (payload) => createTodo(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })



  const patchMutation = useMutation({
    mutationFn: ({ id, patch }) => patchTodo(id, patch),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  function handleAdd(e) {
    e.preventDefault()
    if (!text.trim()) return
    createMutation.mutate({ text: text.trim() })
    setText('')
  }

  function visibleTodos() {
    if (!todos) return []
    if (filter === 'active') return todos.filter((t) => !t.completed)
    if (filter === 'completed') return todos.filter((t) => t.completed)
    return todos
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">
      <header className="flex flex-col items-center gap-2">
        <h1 className="mt-2 text-4xl font-extrabold text-white">Todo App</h1>
        <p className="text-sm text-gray-300 mt-1">A small beautiful todo list — focused on UI polish</p>
      </header>

      <main className="w-full max-w-3xl mt-10">
        <div className="flex justify-center">
          <Card className="w-full">
            <div className="mb-4">
              <form onSubmit={handleAdd} className="flex gap-3">
                <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a new todo..." />
                <Button type="submit">Add</Button>
              </form>
            </div>

            <div className="mt-2">
              {isLoading ? (
                <div className="text-gray-400">Loading...</div>
              ) : (
                <>
                  {visibleTodos().length === 0 ? (
                    <div className="py-12 text-center text-gray-400">
                      <div className="text-2xl mb-2">✨</div>
                      <div className="mb-1">No todos yet</div>
                      <div className="text-xs">Add your first todo using the form above.</div>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {visibleTodos().map((todo) => (
                        <li key={todo.id}>
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Checkbox
                                      checked={todo.completed}
                                      onChange={(v) => patchMutation.mutate({ id: todo.id, patch: { completed: v } })}
                                    />
                                    <div>
                                      <div className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>{todo.text}</div>
                                      <div className="text-xs text-gray-500">ID: {todo.id}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                  
                                    <button onClick={() => deleteMutation.mutate(todo.id)} className="text-sm text-red-400 hover:underline">Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default App
