import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[30px] border border-[color:var(--border)] bg-[color:var(--panel)] shadow-[var(--shadow-card)] lg:grid-cols-[1.12fr_0.88fr]">
          <div className="hidden bg-[radial-gradient(circle_at_top,_rgba(5,150,105,0.10),_transparent_35%),linear-gradient(135deg,var(--primary-light)_0%,#f8fbff_38%,#eaf0fa_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-[color:var(--primary-light)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--primary-dark)]">
                Vendora
              </span>
              <h1 className="mt-6 max-w-md text-4xl font-black tracking-[-0.06em] text-[color:var(--text)]">
                Business operations, made clear and fast.
              </h1>
            </div>

            <div className="space-y-4 text-sm text-[color:var(--muted)]">
              <p>Track customers, orders, payments, and collections in one disciplined workspace built for growing businesses.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] p-4 shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">Orders</p>
                  <p className="mt-2 text-2xl font-bold text-[color:var(--text)]">184</p>
                </div>
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] p-4 shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">Collections</p>
                  <p className="mt-2 text-2xl font-bold text-[color:var(--text)]">KSh 1.8M</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
