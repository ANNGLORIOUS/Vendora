import React from 'react'
import Sidebar from '../components/layout/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-[radial-gradient(circle_at_top,_rgba(5,150,105,0.06),_transparent_30%),linear-gradient(180deg,#f8fafc_0%,#f8fafc_100%)] p-6 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
