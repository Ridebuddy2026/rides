
import { useEffect, useState } from 'react'
import { getRides, subscribe, Ride } from '../services/rideStore'

export function useRides(): Ride[] {
  const [rides, setRides] = useState<Ride[]>(getRides())

  useEffect(() => {
    return subscribe(() => setRides([...getRides()]))
  }, [])

  return rides
}
