import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-[color:var(--primary)] text-white hover:bg-[color:var(--primary-dark)] shadow-soft',
    secondary: 'border border-[color:var(--border)] bg-[color:var(--panel)] text-[color:var(--text)] hover:bg-slate-50',
    ghost: 'text-[color:var(--primary)] hover:bg-[color:var(--primary-light)]',
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
