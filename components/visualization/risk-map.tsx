"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamically import the map component with no SSR
const MapComponent = dynamic(() => import('./map-component'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-black/20 rounded-lg flex items-center justify-center">
      <p className="text-white/60">Loading map...</p>
    </div>
  ),
})

interface RiskMapProps {
  latitude: number
  longitude: number
  riskLevel: string
}

export function RiskMap({ latitude, longitude, riskLevel }: RiskMapProps) {
  return <MapComponent latitude={latitude} longitude={longitude} riskLevel={riskLevel} />
} 