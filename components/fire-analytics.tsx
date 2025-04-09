"use client"

import { useState, useEffect } from "react"
import { BarChartIcon, PieChartIcon, LineChartIcon, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "@/components/ui/chart"
import { motion } from "@/components/motion"

// Custom tooltip component with glow effect
const CustomTooltip = ({ active, payload, label, type }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/10 shadow-glow-sm text-white">
        {type === "bar" && <p className="font-medium text-sm mb-1">Year: {label}</p>}
        {type === "pie" && <p className="font-medium text-sm mb-1">{payload[0].name}</p>}
        {type === "line" && <p className="font-medium text-sm mb-1">Temperature: {label}°C</p>}

        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <p className="text-white/90">
              {entry.name}: <span className="font-medium text-white">{entry.value}</span>
              {type === "pie" && "%"}
              {type === "line" && " risk score"}
            </p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function FireAnalytics() {
  const [activeChart, setActiveChart] = useState<"bar" | "pie" | "line" | "map">("bar")
  const [animateChart, setAnimateChart] = useState(false)

  useEffect(() => {
    // Trigger chart animation after component mounts
    const timer = setTimeout(() => {
      setAnimateChart(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const pieData = [
    { name: "High Risk", value: 35 },
    { name: "Medium Risk", value: 45 },
    { name: "Low Risk", value: 20 },
  ]

  const lineData = [
    { temp: 20, risk: 20 },
    { temp: 25, risk: 35 },
    { temp: 30, risk: 55 },
    { temp: 35, risk: 75 },
    { temp: 40, risk: 90 },
    { temp: 45, risk: 98 },
  ]

  // Vibrant color palettes
  const PIE_COLORS = ["#ef4444", "#f97316", "#22c55e"]
  const LINE_COLORS = ["#f97316", "#ec4899"]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-2"
      >
        <Button
          variant={activeChart === "bar" ? "default" : "outline"}
          onClick={() => setActiveChart("bar")}
          className={`transition-all duration-300 ${
            activeChart === "bar"
              ? "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 shadow-glow-sm"
              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
          }`}
        >
          <BarChartIcon className="mr-2 h-4 w-4" />
          Fire Occurrences
        </Button>
        <Button
          variant={activeChart === "pie" ? "default" : "outline"}
          onClick={() => setActiveChart("pie")}
          className={`transition-all duration-300 ${
            activeChart === "pie"
              ? "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 shadow-glow-sm"
              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
          }`}
        >
          <PieChartIcon className="mr-2 h-4 w-4" />
          Risk Distribution
        </Button>
        <Button
          variant={activeChart === "line" ? "default" : "outline"}
          onClick={() => setActiveChart("line")}
          className={`transition-all duration-300 ${
            activeChart === "line"
              ? "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 shadow-glow-sm"
              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
          }`}
        >
          <LineChartIcon className="mr-2 h-4 w-4" />
          Temperature Impact
        </Button>
        <Button
          variant={activeChart === "map" ? "default" : "outline"}
          onClick={() => setActiveChart("map")}
          className={`transition-all duration-300 ${
            activeChart === "map"
              ? "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 shadow-glow-sm"
              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
          }`}
        >
          <Map className="mr-2 h-4 w-4" />
          Risk Map
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-black/20 border-white/10 p-6 h-[400px] backdrop-blur-xl shadow-glow-sm hover:shadow-glow transition-all duration-500">
          {activeChart === "bar" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: animateChart ? 1 : 0, scale: animateChart ? 1 : 0.95 }}
              transition={{ duration: 0.8 }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                {(() => {
                  // Local data definition inside the chart component
                  const fireData = [
                    { year: 2018, fires: 47 },
                    { year: 2019, fires: 68 },
                    { year: 2020, fires: 89 },
                    { year: 2021, fires: 110 },
                    { year: 2022, fires: 94 },
                    { year: 2023, fires: 73 },
                    { year: 2024, fires: 102 },
                  ]

                  return (
                    <BarChart data={fireData} margin={{ top: 30, right: 30, left: 20, bottom: 30 }}>
                      <defs>
                        {/* Much brighter gradient for visibility */}
                        <linearGradient id="barGradient0" x1="0" y1="1" x2="0" y2="0">
                          <stop offset="0%" stopColor="#FF9500" stopOpacity={1} />
                          <stop offset="100%" stopColor="#FF2D55" stopOpacity={1} />
                        </linearGradient>

                        {/* Alternative bright colors if needed */}
                        <linearGradient id="barGradient1" x1="0" y1="1" x2="0" y2="0">
                          <stop offset="0%" stopColor="#00E676" stopOpacity={1} />
                          <stop offset="100%" stopColor="#00B0FF" stopOpacity={1} />
                        </linearGradient>
                      </defs>
                      <text
                        x="50%"
                        y="15"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        style={{ fontSize: "16px", fontWeight: 600 }}
                      >
                        Wildfire Occurrences Over Time
                      </text>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                      <XAxis
                        dataKey="year"
                        stroke="#FFFFFF"
                        tick={{ fill: "#FFFFFF" }}
                        tickLine={{ stroke: "#FFFFFF" }}
                        axisLine={{ stroke: "#FFFFFF" }}
                        dy={10}
                      />
                      <YAxis
                        stroke="#FFFFFF"
                        tick={{ fill: "#FFFFFF" }}
                        tickLine={{ stroke: "#FFFFFF" }}
                        axisLine={{ stroke: "#FFFFFF" }}
                        dx={-10}
                        label={{
                          value: "Fire Incidents",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#FFFFFF",
                          style: { textAnchor: "middle", fontWeight: 600 },
                        }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value} fires`, "Incidents"]}
                        labelFormatter={(label) => `Year: ${label}`}
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.9)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          borderRadius: "8px",
                          boxShadow: "0 0 15px rgba(255, 165, 0, 0.5)",
                          color: "#FFFFFF",
                          fontFamily: "'Urbanist', 'Inter', sans-serif",
                          fontWeight: 500,
                        }}
                        cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                      />
                      <Legend
                        wrapperStyle={{ color: "#FFFFFF", paddingTop: "10px" }}
                        formatter={(value) => <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{value}</span>}
                      />
                      <Bar
                        dataKey="fires"
                        name="Fire Incidents"
                        fill="url(#barGradient0)"
                        stroke="#FFFFFF"
                        strokeWidth={1}
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                        animationBegin={300}
                        isAnimationActive={true}
                        animationEasing="ease-out"
                      />
                    </BarChart>
                  )
                })()}
              </ResponsiveContainer>
            </motion.div>
          )}

          {activeChart === "pie" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: animateChart ? 1 : 0, scale: animateChart ? 1 : 0.95 }}
              transition={{ duration: 0.8 }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                  <defs>
                    {/* Brighter colors for pie chart */}
                    <linearGradient id="pieGradient0" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF3B30" stopOpacity={1} />
                      <stop offset="100%" stopColor="#FF3B30" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="pieGradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF9500" stopOpacity={1} />
                      <stop offset="100%" stopColor="#FF9500" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="pieGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4CD964" stopOpacity={1} />
                      <stop offset="100%" stopColor="#4CD964" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <text x="50%" y="20" textAnchor="middle" fill="#FFFFFF" style={{ fontSize: "16px", fontWeight: 600 }}>
                    Wildfire Risk Distribution
                  </text>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelStyle={{ fill: "#FFFFFF", fontSize: "12px", fontWeight: 500 }}
                    animationDuration={1500}
                    animationBegin={300}
                    isAnimationActive={true}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#pieGradient${index})`} stroke="#FFFFFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "8px",
                      boxShadow: "0 0 15px rgba(255, 165, 0, 0.5)",
                      color: "#FFFFFF",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value) => <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {activeChart === "line" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: animateChart ? 1 : 0, scale: animateChart ? 1 : 0.95 }}
              transition={{ duration: 0.8 }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF9500" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF9500" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                  <XAxis
                    dataKey="temp"
                    stroke="#FFFFFF"
                    tick={{ fill: "#FFFFFF" }}
                    tickLine={{ stroke: "#FFFFFF" }}
                    axisLine={{ stroke: "#FFFFFF" }}
                    label={{
                      value: "Temperature (°C)",
                      position: "insideBottom",
                      offset: -10,
                      fill: "#FFFFFF",
                      style: { textAnchor: "middle", paddingTop: "15px", fontWeight: 600 },
                    }}
                    dy={10}
                  />
                  <YAxis
                    stroke="#FFFFFF"
                    tick={{ fill: "#FFFFFF" }}
                    tickLine={{ stroke: "#FFFFFF" }}
                    axisLine={{ stroke: "#FFFFFF" }}
                    label={{
                      value: "Risk Score",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#FFFFFF",
                      style: { textAnchor: "middle", fontWeight: 600 },
                    }}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "8px",
                      boxShadow: "0 0 15px rgba(255, 165, 0, 0.5)",
                      color: "#FFFFFF",
                    }}
                    cursor={{ stroke: "rgba(255,255,255,0.5)", strokeWidth: 1, strokeDasharray: "3 3" }}
                  />
                  <Legend
                    wrapperStyle={{ color: "#FFFFFF", paddingTop: "10px" }}
                    formatter={(value) => <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{value}</span>}
                  />
                  <Area
                    type="monotone"
                    dataKey="risk"
                    name="Risk Score"
                    stroke="#FF9500"
                    strokeWidth={3}
                    fill="url(#lineGradient)"
                    dot={{ r: 5, fill: "#FF9500", stroke: "#FFFFFF", strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: "#FF9500", stroke: "#FFFFFF", strokeWidth: 2, className: "shadow-glow" }}
                    animationDuration={1500}
                    animationBegin={300}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {activeChart === "map" && (
            <div className="h-full flex items-center justify-center text-white/60">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-orange-400/30 to-rose-500/30 flex items-center justify-center animate-pulse-subtle">
                  <span className="text-2xl">🌍</span>
                </div>
                <p>Geographic risk map visualization will appear here</p>
                <Button className="bg-gradient-to-r from-orange-500/30 to-rose-500/30 hover:from-orange-500/50 hover:to-rose-500/50 text-white transition-all duration-300 hover:scale-105">
                  View Interactive Map
                </Button>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

