import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-900">Settings</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-bold text-slate-900">Business profile</h2>
            <div className="mt-5 space-y-4 text-sm">
              <div><label className="mb-1 block text-slate-600">Business name</label><input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" defaultValue="Vendora Dairy" /></div>
              <div><label className="mb-1 block text-slate-600">Primary email</label><input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" defaultValue="ops@vendora.co.ke" /></div>
              <div><label className="mb-1 block text-slate-600">Address</label><textarea className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" defaultValue="Nairobi, Kenya" rows={3} /></div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-slate-900">Security</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">Two-factor authentication is available for owner accounts.</div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">JWT tokens are issued by the backend and treated as the source of truth for access control.</div>
              <div className="flex gap-3">
                <Button type="button" variant="secondary">Change password</Button>
                <Button type="button">Save changes</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
