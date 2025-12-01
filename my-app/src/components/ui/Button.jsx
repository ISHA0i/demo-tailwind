import React from 'react'

export default function Button({ children, className = '', variant = 'default', size = 'md', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-600',
    ghost: 'bg-transparent text-indigo-300 hover:bg-white/5',
    destructive: 'bg-red-600 text-white hover:bg-red-500',
  }

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  const cls = [base, variants[variant] || variants.default, sizes[size] || sizes.md, className]

  return (
    <button {...props} className={cls.join(' ')}>
      {children}
    </button>
  )
}
