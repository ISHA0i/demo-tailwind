import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, createTodo, updateTodo, deleteTodo, patchTodo } from './api/todos'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import Card from './components/ui/Card'
import Checkbox from './components/ui/Checkbox'
import { useTodoContext } from './context/TodoContext'

function App() {
  const [text, setText] = useState('')
  const { filter, setFilter } = useTodoContext()
  const queryClient = useQueryClient()

  const { data: todos = [], isLoading } = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  const createMutation = useMutation({
    mutationFn: (payload) => createTodo(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateTodo(id, payload),
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
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-purple-700 bg-opacity-20 sm:bg-purple-700 sm:bg-opacity-10">
      <header className="flex items-center gap-6">
        {/* <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </header>

      <h1 className="mt-6 text-4xl font-extrabold text-indigo-400">Todo App</h1>

      <main className="w-full max-w-3xl mt-10 bg-purple-700 bg-opacity-20 sm:bg-purple-700 sm:bg-opacity-10">
        <div className="flex justify-center">
          <Card>
            <form onSubmit={handleAdd} className="flex gap-3">
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a new todo..." />
              <Button type="submit">Add</Button>
            </form>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setFilter('all')} className={`text-sm px-2 py-1 rounded ${filter==='all' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}>All</button>
                <button onClick={() => setFilter('active')} className={`text-sm px-2 py-1 rounded ${filter==='active' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}>Active</button>
                <button onClick={() => setFilter('completed')} className={`text-sm px-2 py-1 rounded ${filter==='completed' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}>Completed</button>
              </div>

              {isLoading ? (
                <div className="text-gray-400">Loading...</div>
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
                                <button
                                  onClick={() => updateMutation.mutate({ id: todo.id, payload: { text: todo.text + ' (edited)' } })}
                                  className="text-sm text-indigo-300 hover:underline"
                                >
                                  Edit
                                </button>
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
            </div>
          </Card>
        </div>

        <section className="mt-8 text-center text-gray-400">
          <p>All API operations are simulated with a mock localStorage-backed API. React Query handles caching and updates.</p>
        </section>
      </main>
    </div>
  )
}

export default App
