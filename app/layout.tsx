import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FireSight',
  description: 'Your AI Wildfire Predictor',
  generator: 'FireSight',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
