
import { useState } from 'react'
import { useRides } from '../hooks/useQueries'
import RideDetailModal from './RideDetailModal'
import { Ride } from '../services/rideStore'

export default function RidesList() {
  const rides = useRides()
  const [selected, setSelected] = useState<Ride | null>(null)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Rides</h2>

      {rides.length === 0 && (
        <p className="text-gray-500">No rides yet. Create one to get started.</p>
      )}

      <div className="space-y-4">
        {rides.map(r => (
          <div
            key={r.id}
            className="bg-white shadow rounded p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{r.from} → {r.to}</div>
              <div className="text-sm text-gray-500">
                {new Date(r.time).toLocaleString()}
              </div>
              <div className="text-sm">
                Seats: {r.seatsAvailable}/{r.seatsTotal}
              </div>
            </div>

            <button
              disabled={r.seatsAvailable === 0}
              onClick={() => setSelected(r)}
              className={`px-4 py-2 rounded text-sm ${
                r.seatsAvailable === 0
                  ? 'bg-gray-300'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {r.seatsAvailable === 0 ? 'Full' : 'View'}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <RideDetailModal
          ride={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
