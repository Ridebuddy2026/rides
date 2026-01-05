
import { Link } from 'react-router-dom'

export default function Header({ onCreateRide }: { onCreateRide: () => void }) {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">RideBuddies</h1>
      <nav className="space-x-4 text-sm">
        <Link to="/">Home</Link>
        <Link to="/rides">Rides</Link>
        <button
          onClick={onCreateRide}
          className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Create Ride
        </button>
      </nav>
    </header>
  )
}
