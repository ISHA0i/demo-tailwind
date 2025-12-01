import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-gradient-to-b from-indigo-900/10 to-transparent border border-gray-800 rounded-2xl p-6 shadow-lg backdrop-blur-sm hover:shadow-2xl transition-shadow duration-200 ${className}`}>
      {children}
    </div>
  )
}
