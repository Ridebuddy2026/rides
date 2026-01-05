
export default function Hero({ onCreateRide }: { onCreateRide: () => void }) {
  return (
    <section className="max-w-5xl mx-auto p-10 text-center">
      <h2 className="text-4xl font-bold mb-4">Community Ride Sharing</h2>
      <p className="text-gray-600 mb-6">
        Share rides, save costs, and travel smarter.
      </p>
      <button
        onClick={onCreateRide}
        className="bg-indigo-600 text-white px-6 py-3 rounded"
      >
        Create Your First Ride
      </button>
    </section>
  )
}
