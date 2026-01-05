
export type City = {
  name: string
  active: boolean
}

let cities: City[] = [
  { name: 'Bangalore', active: true },
  { name: 'Mumbai', active: false },
  { name: 'Delhi', active: false }
]

let listeners: (() => void)[] = []

export function subscribeCities(cb: () => void) {
  listeners.push(cb)
  return () => (listeners = listeners.filter(l => l !== cb))
}

function notify() {
  listeners.forEach(l => l())
}

export function getCities() {
  return cities
}

export function toggleCity(name: string) {
  cities = cities.map(c =>
    c.name === name ? { ...c, active: !c.active } : c
  )
  notify()
}
