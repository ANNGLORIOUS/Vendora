import React from 'react'
import { Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vendora</h1>
          <nav className="space-x-4">
            <Link to="/dashboard" className="text-sm text-gray-700">Dashboard</Link>
            <Link to="/client" className="text-sm text-gray-700">Client Portal</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white p-8 rounded shadow">Welcome to Vendora</div>
      </main>
    </div>
  )
}
