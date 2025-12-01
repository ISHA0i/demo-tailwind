import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-gradient-to-b from-white/3 to-transparent border border-gray-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm ${className} `}>
      {children}
    </div>
  )
}
