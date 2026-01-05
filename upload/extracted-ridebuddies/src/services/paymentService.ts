
export type PaymentIntent = {
  amount: number
  currency: 'INR'
  provider: 'UPI' | 'Stripe'
}

export async function initiatePayment(intent: PaymentIntent) {
  if (!import.meta.env.VITE_ENABLE_PAYMENTS) {
    console.warn('Payments disabled')
    return { status: 'disabled' }
  }

  // Placeholder for Stripe / UPI integration
  return { status: 'initiated', intent }
}
