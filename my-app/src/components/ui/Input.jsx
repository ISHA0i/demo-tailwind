import React from 'react'

export default function Input({ className = '', ...props }) {
  const cls = `w-full px-3 py-2 rounded-lg bg-white/3 border border-gray-700 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/5 transition ${className}`
  return <input {...props} className={cls} />
}
