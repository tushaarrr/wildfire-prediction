"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface RiskDistributionProps {
  temperature: number
  humidity: number
  windSpeed: number
  rainfall: number
  onPredict: () => void
}

export function RiskDistribution({ temperature, humidity, windSpeed, rainfall, onPredict }: RiskDistributionProps) {
  // Calculate risk factors based on weather conditions
  const calculateRiskFactors = () => {
    let highRisk = 0;
    let mediumRisk = 0;
    let lowRisk = 0;

    // Temperature factor
    if (temperature > 35) highRisk += 30;
    else if (temperature > 30) mediumRisk += 25;
    else lowRisk += 20;

    // Humidity factor
    if (humidity < 30) highRisk += 25;
    else if (humidity < 50) mediumRisk += 20;
    else lowRisk += 15;

    // Wind speed factor
    if (windSpeed > 30) highRisk += 25;
    else if (windSpeed > 20) mediumRisk += 20;
    else lowRisk += 15;

    // Rainfall factor
    if (rainfall < 1) highRisk += 20;
    else if (rainfall < 5) mediumRisk += 15;
    else lowRisk += 10;

    // Normalize percentages
    const total = highRisk + mediumRisk + lowRisk;
    return [
      { name: 'High Risk', value: Math.round((highRisk / total) * 100) },
      { name: 'Medium Risk', value: Math.round((mediumRisk / total) * 100) },
      { name: 'Low Risk', value: Math.round((lowRisk / total) * 100) }
    ];
  };

  const data = calculateRiskFactors();

  const COLORS = ['#f43f5e', '#f97316', '#22c55e'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="bg-black/30 border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-glow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Risk Distribution</h3>
          <Button 
            onClick={onPredict}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-glow-md"
          >
            New Prediction
          </Button>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, 'Probability']}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-white">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  )
} 