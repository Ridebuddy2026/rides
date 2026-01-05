
import { useState } from 'react'
import { setupDriver } from '../services/userStore'

export default function DriverSetupModal({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState('')

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm space-y-4">
        <h3 className="text-lg font-semibold">Driver Profile</h3>
        <input
          className="w-full border p-2 rounded"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          onClick={() => {
            setupDriver(name)
            onDone()
          }}
          disabled={!name}
          className="bg-indigo-600 text-white w-full py-2 rounded"
        >
          Continue as Driver
        </button>
      </div>
    </div>
  )
}
