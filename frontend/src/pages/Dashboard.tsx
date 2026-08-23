import React from 'react'

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-white shadow rounded">Customers: —</div>
        <div className="p-4 bg-white shadow rounded">Orders: —</div>
        <div className="p-4 bg-white shadow rounded">Revenue: —</div>
      </div>
    </div>
  )
}
