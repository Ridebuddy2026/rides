
import { createRide, joinRide } from '../services/rideStore'

export function useRideActions() {
  return {
    createRide,
    joinRide
  }
}
