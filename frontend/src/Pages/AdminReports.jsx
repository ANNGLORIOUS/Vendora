import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

function AdminReports() {
  const [analytics, setAnalytics] = useState({
    totals: { totalRevenue: 0, totalPaid: 0, outstanding: 0, totalCowSpend: 0 },
    revenueSeries: [],
    supplierHealth: [],
    paymentStatus: { paid: 0, partial: 0, outstanding: 0 },
  })
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${API_BASE}/reports/analytics`, { headers: getAuthHeaders() })
        const data = await response.json()
        setAnalytics(data)
      } catch (error) {
        console.error('Failed to load report analytics', error)
      }
    }

    fetchAnalytics()
  }, [])

  const summary = [
    { label: 'Total revenue', value: `KES ${Number(analytics.totals.totalRevenue || 0).toLocaleString()}` },
    { label: 'Outstanding', value: `KES ${Number(analytics.totals.outstanding || 0).toLocaleString()}` },
    { label: 'Payments collected', value: `KES ${Number(analytics.totals.totalPaid || 0).toLocaleString()}` },
    { label: 'Cow spend', value: `KES ${Number(analytics.totals.totalCowSpend || 0).toLocaleString()}` },
  ]

  const downloadCsv = () => {
    const rows = [
      ['Month', 'Revenue'],
      ...analytics.revenueSeries.map((entry) => [entry.label, Number(entry.value || 0)]),
    ]

    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'vendora-reports.csv'
    link.click()
  }

  const exportPdf = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-[#12372a]">Reports</h1>
          <p className="mt-1 text-[#4b5563]">Operational and financial performance overview.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={downloadCsv} className="rounded-lg border border-[#12372a] px-4 py-2 text-sm font-semibold text-[#12372a]">Export CSV</button>
          <button onClick={exportPdf} className="rounded-lg bg-[#12372a] px-4 py-2 text-sm font-semibold text-white">Export PDF</button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">{item.label}</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <h2 className="mb-4 text-lg font-bold text-[#12372a]">Revenue trend</h2>
          <div className="flex h-56 items-end gap-3">
            {analytics.revenueSeries.map((item) => {
              const max = Math.max(...analytics.revenueSeries.map((entry) => Number(entry.value || 0)), 1)
              const height = (Number(item.value || 0) / max) * 100
              return (
                <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
                  <div className="flex h-full w-full items-end justify-center">
                    <div className="w-full rounded-t-xl bg-[#1f6f4a]" style={{ height: `${Math.max(height, 8)}%` }} />
                  </div>
                  <span className="text-xs text-[#4b5563]">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <h2 className="mb-4 text-lg font-bold text-[#12372a]">Order status mix</h2>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm text-[#4b5563]"><span>Paid</span><span>{analytics.paymentStatus.paid}</span></div>
              <div className="h-2.5 rounded-full bg-[#f2efe7]"><div className="h-full rounded-full bg-[#2e7d32]" style={{ width: `${Math.max((analytics.paymentStatus.paid / Math.max(analytics.paymentStatus.paid + analytics.paymentStatus.partial + analytics.paymentStatus.outstanding, 1)) * 100, 10)}%` }} /></div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm text-[#4b5563]"><span>Partially paid</span><span>{analytics.paymentStatus.partial}</span></div>
              <div className="h-2.5 rounded-full bg-[#f2efe7]"><div className="h-full rounded-full bg-[#d97706]" style={{ width: `${Math.max((analytics.paymentStatus.partial / Math.max(analytics.paymentStatus.paid + analytics.paymentStatus.partial + analytics.paymentStatus.outstanding, 1)) * 100, 10)}%` }} /></div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm text-[#4b5563]"><span>Outstanding</span><span>{analytics.paymentStatus.outstanding}</span></div>
              <div className="h-2.5 rounded-full bg-[#f2efe7]"><div className="h-full rounded-full bg-[#c0392b]" style={{ width: `${Math.max((analytics.paymentStatus.outstanding / Math.max(analytics.paymentStatus.paid + analytics.paymentStatus.partial + analytics.paymentStatus.outstanding, 1)) * 100, 10)}%` }} /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
        <h2 className="mb-4 text-lg font-bold text-[#12372a]">Supplier relationship tracking</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Supplier</th>
                <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Purchases</th>
                <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Outstanding</th>
                <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Status</th>
              </tr>
            </thead>
            <tbody>
              {analytics.supplierHealth.map((supplier) => (
                <tr key={supplier.name} className="border-b border-[#f2efe7]">
                  <td className="px-6 py-4 font-semibold text-[#12372a]">{supplier.name}</td>
                  <td className="px-6 py-4 text-[#1f2933]">{supplier.purchases}</td>
                  <td className="px-6 py-4 text-[#1f2933]">KES {Number(supplier.outstanding || 0).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      supplier.status === 'VIP' ? 'bg-[#f8f1d8] text-[#d97706]' : 'bg-[#eaf3ec] text-[#2e7d32]'
                    }`}>{supplier.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminReports
