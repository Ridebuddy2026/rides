
import { getUser } from './userStore'

export type Ride = {
  id: string
  from: string
  to: string
  time: string
  seatsTotal: number
  seatsAvailable: number
  price?: number
  createdAt: number
  driverId: string
  driverName: string
}

let rides: Ride[] = []
let listeners: (() => void)[] = []

export function subscribe(cb: () => void) {
  listeners.push(cb)
  return () => {
    listeners = listeners.filter(l => l !== cb)
  }
}

function notify() {
  listeners.forEach(l => l())
}

export function getRides() {
  return rides
}

export function createRide(data: Omit<Ride, 'id' | 'createdAt' | 'seatsAvailable' | 'driverId' | 'driverName'>) {
  const user = getUser()
  if (!user) throw new Error("Driver not set")

  const ride: Ride = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    seatsAvailable: data.seatsTotal,
    driverId: user.id,
    driverName: user.name
  }
  rides = [ride, ...rides]
  notify()
}

export function joinRide(rideId: string) {
  rides = rides.map(r => {
    if (r.id === rideId && r.seatsAvailable > 0) {
      return { ...r, seatsAvailable: r.seatsAvailable - 1 }
    }
    return r
  })
  notify()
}
