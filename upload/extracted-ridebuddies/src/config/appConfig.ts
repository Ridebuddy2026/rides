
export const AppConfig = {
  env: import.meta.env.VITE_APP_ENV || 'local',
  paymentsEnabled: import.meta.env.VITE_ENABLE_PAYMENTS === 'true'
}
