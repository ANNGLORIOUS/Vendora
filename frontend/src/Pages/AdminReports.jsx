function AdminReports() {
  const summary = [
    { label: 'Total revenue', value: 'KES 956,400' },
    { label: 'Outstanding', value: 'KES 142,500' },
    { label: 'Payments this month', value: 'KES 318,000' },
    { label: 'Cow spend', value: 'KES 412,000' },
  ]

  const rows = [
    { name: 'Muthiga Butchery', balance: 'KES 42,000', status: 'Partially paid' },
    { name: 'Kisumu Meat Hub', balance: 'KES 0', status: 'Paid' },
    { name: 'Nakuru Supplies Co.', balance: 'KES 93,000', status: 'Outstanding' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#12372a]">Reports</h1>
        <p className="mt-1 text-[#4b5563]">Operational and financial performance overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">{item.label}</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
        <h2 className="mb-4 text-lg font-bold text-[#12372a]">Outstanding accounts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Customer</th>
                <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Outstanding</th>
                <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                  <td className="px-6 py-4 font-semibold text-[#12372a]">{row.name}</td>
                  <td className="px-6 py-4 text-[#1f2933]">{row.balance}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      row.status === 'Paid' ? 'bg-[#eaf3ec] text-[#2e7d32]' : row.status === 'Partially paid' ? 'bg-[#f8f1d8] text-[#d97706]' : 'bg-[#fde8e7] text-[#c0392b]'
                    }`}>
                      {row.status}
                    </span>
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
