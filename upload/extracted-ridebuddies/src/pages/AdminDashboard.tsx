
import { useEffect, useState } from 'react'
import { getCities, subscribeCities, toggleCity } from '../services/cityStore'

export default function AdminDashboard() {
  const [cities, setCities] = useState(getCities())

  useEffect(() => subscribeCities(() => setCities([...getCities()])), [])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <h2 className="font-semibold mb-2">City Launch Control</h2>
      <div className="space-y-3">
        {cities.map(c => (
          <div key={c.name} className="flex justify-between bg-white p-4 rounded shadow">
            <span>{c.name}</span>
            <button
              onClick={() => toggleCity(c.name)}
              className={`px-4 py-1 rounded text-sm ${
                c.active ? 'bg-green-600 text-white' : 'bg-gray-300'
              }`}
            >
              {c.active ? 'Live' : 'Disabled'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
