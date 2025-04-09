"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Flame, CheckCircle, Download, Share2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "@/components/motion"

export function RiskDisplay() {
  const [progress, setProgress] = useState(0)
  const [riskLevel, setRiskLevel] = useState<"high" | "medium" | "low">("high")
  const [confidenceScore, setConfidenceScore] = useState(82)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(confidenceScore)
    }, 100)

    const detailsTimer = setTimeout(() => {
      setShowDetails(true)
    }, 800)

    return () => {
      clearTimeout(timer)
      clearTimeout(detailsTimer)
    }
  }, [confidenceScore])

  const riskConfig = {
    high: {
      icon: Flame,
      color: "text-red-500",
      bgColor: "bg-red-500",
      bgGradient: "bg-gradient-to-r from-red-500 to-orange-500",
      bgColorLight: "bg-gradient-to-r from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/20",
      shadowColor: "shadow-red-500/20",
      label: "High Risk",
      description: "Conditions are favorable for wildfire ignition and rapid spread.",
      animation: "animate-pulse",
    },
    medium: {
      icon: AlertTriangle,
      color: "text-amber-400",
      bgColor: "bg-amber-400",
      bgGradient: "bg-gradient-to-r from-amber-400 to-orange-400",
      bgColorLight: "bg-gradient-to-r from-amber-400/20 to-orange-400/20",
      borderColor: "border-amber-400/20",
      shadowColor: "shadow-amber-400/20",
      label: "Medium Risk",
      description: "Some risk factors present. Monitor conditions closely.",
      animation: "animate-pulse-slow",
    },
    low: {
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500",
      bgGradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
      bgColorLight: "bg-gradient-to-r from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/20",
      shadowColor: "shadow-emerald-500/20",
      label: "Low Risk",
      description: "Conditions are not favorable for wildfire ignition or spread.",
      animation: "",
    },
  }

  const config = riskConfig[riskLevel]
  const Icon = config.icon

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <div className={`p-4 rounded-full ${config.bgColorLight} ${config.animation} shadow-lg ${config.shadowColor}`}>
          <Icon className={`h-8 w-8 ${config.color}`} />
        </div>
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span className={`${config.color} ${config.animation}`}>{config.label}</span>
            <Badge className={`${config.bgColorLight} ${config.color} ${config.borderColor} ${config.animation}`}>
              {confidenceScore}% Confidence
            </Badge>
          </h3>
          <p className="text-white/70">{config.description}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-2"
      >
        <div className="flex justify-between text-sm">
          <span>Confidence Score</span>
          <span className="font-medium">{confidenceScore}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-white/10" indicatorClassName={config.bgGradient} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 gap-4 pt-2"
      >
        <div className="space-y-1 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm">
          <div className="text-sm text-white/70">Temperature Impact</div>
          <div className="text-lg font-medium flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            Very High
          </div>
        </div>
        <div className="space-y-1 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm">
          <div className="text-sm text-white/70">Wind Impact</div>
          <div className="text-lg font-medium flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
            Moderate
          </div>
        </div>
        <div className="space-y-1 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm">
          <div className="text-sm text-white/70">Humidity Impact</div>
          <div className="text-lg font-medium flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            High
          </div>
        </div>
        <div className="space-y-1 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm">
          <div className="text-sm text-white/70">Rainfall Impact</div>
          <div className="text-lg font-medium flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Low
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex gap-2 pt-2"
      >
        <Button className="bg-white/10 hover:bg-white/20 text-white flex-1 group hover:scale-105 transition-all duration-200">
          <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" /> Export Report
        </Button>
        <Button className="bg-white/10 hover:bg-white/20 text-white flex-1 group hover:scale-105 transition-all duration-200">
          <Share2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" /> Share
        </Button>
      </motion.div>
    </div>
  )
}

