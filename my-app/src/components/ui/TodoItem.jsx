import React from 'react'
import Checkbox from './Checkbox'

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-transparent p-3 rounded-md hover:bg-white/2 transition">
      <div className="flex items-center gap-3">
        <Checkbox checked={todo.completed} onChange={onToggle} />
        <div>
          <div className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>{todo.text}</div>
          <div className="text-xs text-gray-500">ID: {todo.id}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onEdit} className="text-sm text-indigo-300 hover:underline">Edit</button>
        <button onClick={onDelete} className="text-sm text-red-400 hover:underline">Delete</button>
      </div>
    </div>
  )
}
