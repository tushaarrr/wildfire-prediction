"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface TemperatureImpactProps {
  currentTemp: number
  confidence: number
}

export function TemperatureImpact({ currentTemp, confidence }: TemperatureImpactProps) {
  // Calculate risk based on temperature thresholds
  const calculateRisk = (temp: number) => {
    // Base risk from current confidence
    let baseRisk = confidence * 0.5; // Reduce the base risk impact

    // Temperature impact factors
    if (temp < 0) {
      return Math.max(0, baseRisk * 0.2); // Very low risk in freezing temperatures
    } else if (temp < 10) {
      return Math.max(0, baseRisk * 0.4); // Low risk in cool temperatures
    } else if (temp < 20) {
      return Math.max(0, baseRisk * 0.6); // Moderate risk
    } else if (temp < 30) {
      return Math.min(100, baseRisk * 1.2); // Increased risk
    } else if (temp < 35) {
      return Math.min(100, baseRisk * 1.5); // High risk
    } else {
      return Math.min(100, baseRisk * 1.8); // Very high risk but capped at 100
    }
  };

  // Generate temperature data points with more realistic range
  const data = Array.from({ length: 11 }, (_, i) => {
    const temp = currentTemp - 15 + (i * 3); // Wider temperature range
    const impact = calculateRisk(temp);
    return { temperature: Math.round(temp), impact: Math.round(impact) };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <Card className="bg-black/30 border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-glow-sm">
        <h3 className="text-lg font-semibold mb-4 text-white">Temperature Impact on Risk</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="temperature"
                stroke="rgba(255,255,255,0.5)"
                label={{ value: 'Temperature (°C)', position: 'bottom', fill: 'rgba(255,255,255,0.5)' }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.5)"
                label={{ value: 'Risk Score', angle: -90, position: 'left', fill: 'rgba(255,255,255,0.5)' }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, 'Risk']}
              />
              <Line
                type="monotone"
                dataKey="impact"
                stroke="url(#gradient)"
                strokeWidth={2}
                dot={{ fill: '#f97316', stroke: '#f43f5e', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#f43f5e' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22c55e" /> {/* Green for low risk */}
                  <stop offset="50%" stopColor="#f97316" /> {/* Orange for medium risk */}
                  <stop offset="100%" stopColor="#f43f5e" /> {/* Red for high risk */}
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  )
} 