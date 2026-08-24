import React from 'react'

export default function UserMenu() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#059669] text-sm font-bold text-white">
        JM
      </div>
      <div className="text-left">
        <p className="text-sm font-semibold text-slate-900">Jane Muriuki</p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Admin</p>
      </div>
    </div>
  )
}
