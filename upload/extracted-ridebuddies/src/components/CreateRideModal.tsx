
import { useState } from 'react'
import { useRideActions } from '../hooks/userEdits'
import { getUser } from '../services/userStore'

export default function CreateRideModal({ onClose }: { onClose: () => void }) {
  const user = getUser()
  const { createRide } = useRideActions()

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [time, setTime] = useState('')
  const [seats, setSeats] = useState(1)
  const [price, setPrice] = useState('')

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded">
          <p>Please setup driver profile first.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
            Close
          </button>
        </div>
      </div>
    )
  }

  function submit() {
    createRide({
      from,
      to,
      time,
      seatsTotal: seats,
      price: price ? Number(price) : undefined
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
        <h3 className="text-lg font-semibold">Create Ride</h3>

        <input className="w-full border p-2 rounded" placeholder="From" value={from} onChange={e => setFrom(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="To" value={to} onChange={e => setTo(e.target.value)} />
        <input type="datetime-local" className="w-full border p-2 rounded" value={time} onChange={e => setTime(e.target.value)} />
        <input type="number" min={1} className="w-full border p-2 rounded" value={seats} onChange={e => setSeats(Number(e.target.value))} />
        <input type="number" className="w-full border p-2 rounded" placeholder="Price (optional)" value={price} onChange={e => setPrice(e.target.value)} />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={submit} className="bg-indigo-600 text-white px-4 py-2 rounded">Create</button>
        </div>
      </div>
    </div>
  )
}
