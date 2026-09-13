import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

function AdminSettings() {
  const { getAuthHeaders } = useAuth()
  const [settings, setSettings] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    defaultCurrency: 'KES',
    reminderThresholdDays: 7,
    invoicePrefix: 'VND',
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE}/settings`, { headers: getAuthHeaders() })
        const data = await response.json()
        setSettings(data)
      } catch (error) {
        console.error('Failed to fetch settings', error)
      }
    }

    fetchSettings()
  }, [])

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value })
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(settings),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Failed to save settings', error)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold text-[#12372a]">Business Settings</h1>

      {saved && (
        <div className="rounded-lg bg-[#eaf3ec] p-4 text-[#2e7d32]">
          ✓ Settings saved successfully
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#12372a]">Business profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#12372a]">Business Name</label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#d9d0ba] px-4 py-2 outline-none focus:border-[#1f6f4a]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#12372a]">Business Email</label>
              <input
                type="email"
                value={settings.businessEmail}
                onChange={(e) => handleChange('businessEmail', e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#d9d0ba] px-4 py-2 outline-none focus:border-[#1f6f4a]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#12372a]">Business Phone</label>
              <input
                type="tel"
                value={settings.businessPhone}
                onChange={(e) => handleChange('businessPhone', e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#d9d0ba] px-4 py-2 outline-none focus:border-[#1f6f4a]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#12372a]">Business Address</label>
              <input
                type="text"
                value={settings.businessAddress}
                onChange={(e) => handleChange('businessAddress', e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#d9d0ba] px-4 py-2 outline-none focus:border-[#1f6f4a]"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#eee5d2] pt-6">
          <h2 className="mb-4 text-lg font-bold text-[#12372a]">Operations</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-[#12372a]">Currency</label>
              <select
                value={settings.defaultCurrency}
                onChange={(e) => handleChange('defaultCurrency', e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#d9d0ba] px-4 py-2 outline-none focus:border-[#1f6f4a]"
              >
                <option value="KES">KES</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#12372a]">Reminder threshold (days)</label>
              <input
                type="number"
                value={settings.reminderThresholdDays}
                onChange={(e) => handleChange('reminderThresholdDays', e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#d9d0ba] px-4 py-2 outline-none focus:border-[#1f6f4a]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#12372a]">Invoice prefix</label>
              <input
                type="text"
                value={settings.invoicePrefix}
                onChange={(e) => handleChange('invoicePrefix', e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#d9d0ba] px-4 py-2 outline-none focus:border-[#1f6f4a]"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#eee5d2] pt-6">
          <button
            type="submit"
            className="rounded-lg bg-[#12372a] px-6 py-2 font-semibold text-white transition hover:bg-[#1f6f4a]"
          >
            Save settings
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminSettings
