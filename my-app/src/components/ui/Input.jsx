import React from 'react'

export default function Input({ className = '', ...props }) {
  const cls = `w-full px-3 py-2 rounded-md bg-transparent border border-gray-700 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`
  return <input {...props} className={cls} />
}
