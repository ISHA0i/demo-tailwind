import React, { createContext, useContext, useState } from 'react'

const TodoContext = createContext(null)

export function TodoProvider({ children }) {
  const [filter, setFilter] = useState('all') // all | active | completed

  const value = {
    filter,
    setFilter,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodoContext() {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodoContext must be used within TodoProvider')
  return ctx
}
