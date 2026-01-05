
import { Ride } from '../services/rideStore'
import { useRideActions } from '../hooks/userEdits'

export default function RideDetailModal({
  ride,
  onClose
}: {
  ride: Ride
  onClose: () => void
}) {
  const { joinRide } = useRideActions()

  const isFull = ride.seatsAvailable === 0

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
        <h3 className="text-lg font-semibold">Ride Details</h3>

        <div>
          <div className="font-medium">{ride.from} → {ride.to}</div>
          <div className="text-sm text-gray-500">
            {new Date(ride.time).toLocaleString()}
          </div>
          <div className="text-sm mt-2">
            Seats left: {ride.seatsAvailable}/{ride.seatsTotal}
          </div>
          {ride.price && <div className="text-sm">Price: ₹{ride.price}</div>}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2">Close</button>
          <button
            disabled={isFull}
            onClick={() => {
              joinRide(ride.id)
              onClose()
            }}
            className={`px-4 py-2 rounded ${
              isFull ? 'bg-gray-300' : 'bg-indigo-600 text-white'
            }`}
          >
            {isFull ? 'Ride Full' : 'Join Ride'}
          </button>
        </div>
      </div>
    </div>
  )
}
