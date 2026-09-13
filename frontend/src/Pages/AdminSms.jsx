import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

function AdminSms() {
  const [template, setTemplate] = useState('Dear customer, your payment is overdue. Please settle your balance to avoid service interruption.')
  const [recipient, setRecipient] = useState('Muthiga Butchery')
  const [sent, setSent] = useState(false)
  const { getAuthHeaders } = useAuth()

  const handleSend = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`${API_BASE}/sms/reminders/send`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ recipient, phone: '+254700000000', template }),
      })

      if (response.ok) {
        setSent(true)
        setTimeout(() => setSent(false), 2500)
      }
    } catch (error) {
      console.error('Failed to queue SMS reminder', error)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#12372a]">SMS Reminders</h1>
        <p className="mt-1 text-[#4b5563]">Send payment reminders and track communication history.</p>
      </div>

      <form onSubmit={handleSend} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2] space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#12372a]">Recipient</label>
          <input value={recipient} onChange={(e) => setRecipient(e.target.value)} className="mt-2 w-full rounded-lg border border-[#d9d0ba] px-4 py-2 outline-none focus:border-[#1f6f4a]" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#12372a]">Message template</label>
          <textarea value={template} onChange={(e) => setTemplate(e.target.value)} rows={5} className="mt-2 w-full rounded-lg border border-[#d9d0ba] px-4 py-2 outline-none focus:border-[#1f6f4a]" />
        </div>

        {sent && (
          <div className="rounded-lg bg-[#eaf3ec] p-4 text-[#2e7d32]">✓ Reminder queued for delivery.</div>
        )}

        <button type="submit" className="rounded-lg bg-[#12372a] px-6 py-2 font-semibold text-white transition hover:bg-[#1f6f4a]">Send reminder</button>
      </form>
    </div>
  )
}

export default AdminSms
