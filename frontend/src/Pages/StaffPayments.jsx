import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

const formatCurrency = (value) => `KES ${Number(value || 0).toLocaleString()}`

function StaffPayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('vendoraStaffToken')

    const fetchPayments = async () => {
      try {
        const response = await fetch(`${API_BASE}/payments`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Unable to load payments')
        }

        const data = await response.json()
        setPayments(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
        setPayments([])
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  if (loading) {
    return <div className="rounded-2xl bg-white p-6 text-[#12372a] shadow-sm border border-[#eee5d2]">Loading payments...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Payments</h1>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-[#eee5d2]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Customer</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Method</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Amount</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Notes</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-[#4b5563]">No payment records found.</td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                  <td className="px-6 py-4 text-[#1f2933]">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-semibold text-[#12372a]">{payment.customerName}</td>
                  <td className="px-6 py-4 text-[#1f2933]">{payment.method || 'Mpesa'}</td>
                  <td className="px-6 py-4 font-semibold text-[#12372a]">{formatCurrency(payment.amount)}</td>
                  <td className="px-6 py-4 text-[#1f2933]">{payment.notes || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StaffPayments
