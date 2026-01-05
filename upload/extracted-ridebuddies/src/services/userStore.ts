
export type User = {
  id: string
  name: string
  role: 'rider' | 'driver' | 'admin'
}

let currentUser: User | null = null
let listeners: (() => void)[] = []

export function subscribeUser(cb: () => void) {
  listeners.push(cb)
  return () => (listeners = listeners.filter(l => l !== cb))
}

function notify() {
  listeners.forEach(l => l())
}

export function getUser() {
  return currentUser
}

export function setupDriver(name: string) {
  currentUser = {
    id: crypto.randomUUID(),
    name,
    role: 'driver'
  }
  notify()
}

export function setupAdmin(name: string) {
  currentUser = {
    id: crypto.randomUUID(),
    name,
    role: 'admin'
  }
  notify()
}
