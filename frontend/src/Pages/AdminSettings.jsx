import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: '',
    storeEmail: '',
    storePhone: '',
    storeAddress: '',
    currency: 'KES',
    taxRate: 16,
    shippingCost: 300,
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE}/settings`)
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
        headers: { 'Content-Type': 'application/json' },
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
      <h1 className="text-3xl font-bold text-gray-800">Store Settings</h1>

      {saved && (
        <div className="rounded-lg bg-green-100 p-4 text-green-700">
          ✓ Settings saved successfully
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 rounded-lg bg-white p-6 shadow">
        {/* Store Information */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-gray-800">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => handleChange('storeName', e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Store Email</label>
              <input
                type="email"
                value={settings.storeEmail}
                onChange={(e) => handleChange('storeEmail', e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Store Phone</label>
              <input
                type="tel"
                value={settings.storePhone}
                onChange={(e) => handleChange('storePhone', e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Store Address</label>
              <input
                type="text"
                value={settings.storeAddress}
                onChange={(e) => handleChange('storeAddress', e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
              />
            </div>
          </div>
        </div>

        {/* Pricing Settings */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="mb-4 text-lg font-bold text-gray-800">Pricing Settings</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
              >
                <option value="KES">KES (Kenyan Shilling)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => handleChange('taxRate', e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Shipping Cost</label>
              <input
                type="number"
                value={settings.shippingCost}
                onChange={(e) => handleChange('shippingCost', e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 pt-6">
          <button
            type="submit"
            className="rounded-lg bg-(--brand-900) px-6 py-2 font-semibold text-white transition hover:bg-(--brand-700)"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminSettings
