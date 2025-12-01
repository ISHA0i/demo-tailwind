import React from 'react'

export default function Checkbox({ checked, onChange, className = '' }) {
  return (
    <label className={`relative inline-flex items-center justify-center w-7 h-7 rounded-md border transition ${checked ? 'bg-indigo-600 border-indigo-600' : 'border-gray-700 bg-transparent'} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        className="absolute inset-0 w-full h-full opacity-0 m-0 cursor-pointer"
      />
      <span className="pointer-events-none">
        <svg className={`w-4 h-4 ${checked ? 'text-white' : 'text-transparent'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </label>
  )
}
