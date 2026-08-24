import React from 'react'

const salesRows = [
  { customer: 'Njeri Mwangi', product: 'Holstein Cow', date: '12 Aug', amount: 'KSh 120,000', status: 'Paid' },
  { customer: 'James Kibet', product: 'Dairy Feed', date: '11 Aug', amount: 'KSh 36,500', status: 'Pending' },
  { customer: 'Mary Achieng', product: 'Vaccination', date: '10 Aug', amount: 'KSh 18,200', status: 'Paid' },
  { customer: 'David Oduor', product: 'Milk Cooler', date: '09 Aug', amount: 'KSh 48,000', status: 'Overdue' },
]

export default function RecentSalesTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Customer</th>
            <th className="px-4 py-3 font-semibold">Product</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Amount</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {salesRows.map((row) => (
            <tr key={row.customer} className="border-t border-slate-200 bg-white">
              <td className="px-4 py-3 font-medium text-slate-800">{row.customer}</td>
              <td className="px-4 py-3 text-slate-600">{row.product}</td>
              <td className="px-4 py-3 text-slate-600">{row.date}</td>
              <td className="px-4 py-3 font-semibold text-slate-800">{row.amount}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  row.status === 'Paid'
                    ? 'bg-emerald-100 text-emerald-700'
                    : row.status === 'Pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                }`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
