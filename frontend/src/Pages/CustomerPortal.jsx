import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:5000/api'

function CustomerPortal() {
  const [summary, setSummary] = useState({ customerName: 'Customer', totalInvoices: 0, paidInvoices: 0, totalOutstanding: 0, totalPayments: 0 })
  const [invoices, setInvoices] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('vendoraCustomerToken')
    if (!token) {
      navigate('/customer/login', { replace: true })
      return
    }

    const fetchPortal = async () => {
      try {
        const response = await fetch(`${API_BASE}/customer/portal`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('vendoraCustomerToken')
          localStorage.removeItem('customerData')
          navigate('/customer/login', { replace: true })
          return
        }

        const data = await response.json()
        if (data?.success) {
          setSummary(data.summary)
          setInvoices(data.invoices || [])
          setPayments(data.payments || [])
        }
      } catch (error) {
        console.error('Failed to load customer portal data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortal()
  }, [navigate])

  const revenueChart = useMemo(() => {
    const maxValue = Math.max(...[summary.totalOutstanding || 0, summary.totalPayments || 0, 50000], 1)
    return [
      { label: 'Outstanding', value: summary.totalOutstanding || 0, percent: ((summary.totalOutstanding || 0) / maxValue) * 100 },
      { label: 'Paid', value: summary.totalPayments || 0, percent: ((summary.totalPayments || 0) / maxValue) * 100 },
      { label: 'Open Invoices', value: summary.totalInvoices || 0, percent: ((summary.totalInvoices || 0) / 10) * 100 },
    ]
  }, [summary])

  const downloadCsv = () => {
    const rows = [
      ['Invoice', 'Status', 'Amount', 'Due Date'],
      ...invoices.map((invoice) => [invoice.invoiceNumber || invoice.id, invoice.status || 'Unpaid', Number(invoice.amount || 0), invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A']),
    ]

    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'vendora-customer-report.csv'
    link.click()
  }

  const exportPdf = () => {
    window.print()
  }

  const handleLogout = () => {
    localStorage.removeItem('vendoraCustomerToken')
    localStorage.removeItem('customerData')
    navigate('/customer/login', { replace: true })
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-[#12372a]">Loading customer portal...</div>
  }

  return (
    <div className="min-h-screen bg-[#f8f6ef] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4a72c]">Customer portal</p>
            <h1 className="mt-2 text-3xl font-bold text-[#12372a]">{summary.customerName}</h1>
          </div>

          <div className="flex gap-3">
            <button onClick={downloadCsv} className="rounded-lg border border-[#12372a] px-4 py-2 text-sm font-semibold text-[#12372a] hover:bg-white">Export CSV</button>
            <button onClick={exportPdf} className="rounded-lg bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f6f4a]">Export PDF</button>
            <button onClick={handleLogout} className="rounded-lg bg-[#d4a72c] px-4 py-2 text-sm font-semibold text-[#12372a] hover:bg-[#e4b32d]">Logout</button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Invoices</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{summary.totalInvoices}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Paid</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{summary.paidInvoices}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Outstanding</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">KES {Number(summary.totalOutstanding || 0).toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Payments</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">KES {Number(summary.totalPayments || 0).toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <h2 className="mb-4 text-lg font-bold text-[#12372a]">Invoices</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#4b5563]">Invoice</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#4b5563]">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#4b5563]">Due date</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#4b5563]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.length === 0 ? (
                    <tr>
                      <td className="px-4 py-6 text-[#4b5563]" colSpan="4">No invoices available.</td>
                    </tr>
                  ) : (
                    invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-[#f2efe7]">
                        <td className="px-4 py-3 font-semibold text-[#12372a]">{invoice.invoiceNumber || `INV-${invoice.id}`}</td>
                        <td className="px-4 py-3 text-[#1f2933]">KES {Number(invoice.amount || 0).toLocaleString()}</td>
                        <td className="px-4 py-3 text-[#1f2933]">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            invoice.status === 'Paid' ? 'bg-[#eaf3ec] text-[#2e7d32]' : invoice.status === 'Partially Paid' ? 'bg-[#f8f1d8] text-[#d97706]' : 'bg-[#fde8e7] text-[#c0392b]'
                          }`}>
                            {invoice.status || 'Unpaid'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <h2 className="mb-4 text-lg font-bold text-[#12372a]">Payments & analytics</h2>
            <div className="space-y-4">
              {revenueChart.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-[#4b5563]">
                    <span>{item.label}</span>
                    <span className="font-semibold text-[#12372a]">KES {Number(item.value).toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#f2efe7]">
                    <div className="h-full rounded-full bg-[#1f6f4a]" style={{ width: `${Math.min(item.percent, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-[#f8f6ef] p-4">
              <h3 className="text-sm font-semibold text-[#12372a]">Recent payments</h3>
              <div className="mt-4 space-y-2">
                {payments.length === 0 ? (
                  <p className="text-sm text-[#4b5563]">No payments yet.</p>
                ) : (
                  payments.slice(0, 4).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between rounded-lg bg-white p-2 text-sm">
                      <span className="text-[#1f2933]">{payment.method || 'Mpesa'}</span>
                      <span className="font-semibold text-[#12372a]">KES {Number(payment.amount || 0).toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerPortal
