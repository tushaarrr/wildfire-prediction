"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Calendar,
  Home,
  Info,
  LogOut,
  MessageSquare,
  Settings,
  AlertTriangle,
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  MapPin,
  X,
  CloudSun,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/date-picker"
import { RiskDisplay } from "@/components/risk-display"
import { FireAnalytics } from "@/components/fire-analytics"
import { ChatBot } from "@/components/chat-bot"
import { AnalysisAIChat } from "@/components/analysis-ai-chat"
import { motion } from "@/components/motion"
import { WeatherModal } from "@/components/weather-modal"
import { Switch } from "@/components/ui/switch"
import { RiskDistribution } from '@/components/visualization/risk-distribution'
import { TemperatureImpact } from '@/components/visualization/temperature-impact'
import { RiskMap } from '@/components/visualization/risk-map'
import { Toaster, toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { NewsWidget } from "@/components/news-widget"

export default function Dashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    windSpeed: "",
    rainfall: "",
    latitude: "",
    longitude: "",
    date: new Date(),
  })
  const [predictionResult, setPredictionResult] = useState<{
    risk: "High" | "Low";
    confidence: number;
    factors: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      rainfall: number;
    };
  } | null>(null)
  const [showAlert, setShowAlert] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [showWeatherModal, setShowWeatherModal] = useState(false)
  const [isWeatherLoading, setIsWeatherLoading] = useState(false)
  const [isUsingLiveWeather, setIsUsingLiveWeather] = useState(false)
  const [weatherSource, setWeatherSource] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    // Create fire particles
    const createParticle = () => {
      if (typeof window === "undefined") return

      const particle = document.createElement("div")
      particle.classList.add("fire-particle")

      // Random position
      const posX = Math.random() * window.innerWidth
      const posY = window.innerHeight + 10

      // Random size
      const size = Math.random() * 6 + 2

      // Apply styles
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${posX}px`
      particle.style.top = `${posY}px`
      particle.style.opacity = (Math.random() * 0.5 + 0.3).toString()

      // Add to DOM
      document.body.appendChild(particle)

      // Remove after animation completes
      setTimeout(() => {
        particle.remove()
      }, 15000)
    }

    // Create particles at interval
    const interval = setInterval(createParticle, 300)

    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }))
    }
  }

  const handlePredict = async () => {
    try {
      setError(null)
      setIsLoading(true)
      const response = await fetch('http://localhost:8001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          windSpeed: parseFloat(formData.windSpeed),
          rainfall: parseFloat(formData.rainfall),
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude)
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to get prediction')
      }

      const result = await response.json()
      setPredictionResult(result)
      setShowResult(true)

      // Show toast notification for high risk
      if (result.risk === 'High') {
        toast.error('⚠️ High Wildfire Risk Detected', {
          description: `Confidence: ${result.confidence}%`,
        })
      }

      // Smooth scroll to results
      const resultsSection = document.getElementById('results-section')
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' })
      }
    } catch (err: any) {
      setError(err.message)
      console.error('Prediction error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to get prediction')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseLiveWeather = async (city?: string) => {
    try {
      setIsLoading(true)
      let url = 'http://localhost:8001/weather'
      if (city) {
        url += `?city=${encodeURIComponent(city)}`
      } else if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        url += `?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      } else {
        throw new Error('Geolocation is not supported by your browser')
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()
      setFormData({
        temperature: data.temperature.toString(),
        humidity: data.humidity.toString(),
        windSpeed: data.windSpeed.toString(),
        rainfall: data.rainfall.toString(),
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
        date: new Date(),
      })
    } catch (error) {
      console.error('Weather fetch error:', error)
      alert(error instanceof Error ? error.message : 'Failed to fetch weather data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await handleUseLiveWeather()
        },
        (error) => {
          console.error("Geolocation error:", error)
          alert("Failed to get your location")
        }
      )
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  if (!mounted) return null

  const inputFields = [
    { 
      name: "temperature", 
      label: "Temperature (°C)", 
      icon: Thermometer, 
      value: formData.temperature,
      placeholder: "Enter temperature",
      type: "number",
      min: -50,
      max: 50,
      step: 0.1
    },
    { 
      name: "humidity", 
      label: "Humidity (%)", 
      icon: Droplets, 
      value: formData.humidity,
      placeholder: "Enter humidity",
      type: "number",
      min: 0,
      max: 100,
      step: 0.1
    },
    { 
      name: "windSpeed", 
      label: "Wind Speed (km/h)", 
      icon: Wind, 
      value: formData.windSpeed,
      placeholder: "Enter wind speed",
      type: "number",
      min: 0,
      max: 200,
      step: 0.1
    },
    { 
      name: "rainfall", 
      label: "Rainfall (mm)", 
      icon: CloudRain, 
      value: formData.rainfall,
      placeholder: "Enter rainfall",
      type: "number",
      min: 0,
      max: 1000,
      step: 0.1
    },
    { 
      name: "latitude", 
      label: "Latitude", 
      icon: MapPin, 
      value: formData.latitude,
      placeholder: "Enter latitude",
      type: "number",
      min: -90,
      max: 90,
      step: 0.000001
    },
    { 
      name: "longitude", 
      label: "Longitude", 
      icon: MapPin, 
      value: formData.longitude,
      placeholder: "Enter longitude",
      type: "number",
      min: -180,
      max: 180,
      step: 0.000001
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950 text-white relative overflow-hidden font-urbanist">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] mix-blend-overlay opacity-5"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Alert notification */}
      {showAlert && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-red-500 text-white py-2 px-4 flex items-center justify-between"
        >
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p className="text-sm font-medium">High fire risk detected in your area. Stay alert and prepared.</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAlert(false)}
            className="text-white hover:bg-white/20"
          >
            Dismiss
          </Button>
        </motion.div>
      )}

      {/* Navbar with glassmorphism */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <div className="h-6 w-6 flex items-center justify-center">
              <img 
                src="/firesight-logo.png" 
                alt="FireSight Logo" 
                className="h-full w-full object-contain"
                style={{ filter: 'brightness(1.2)' }}
              />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
              FireSight
            </span>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-6"
          >
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200"
              onClick={() => router.push("/dashboard")}
            >
              <Home className="mr-2 h-4 w-4" /> Dashboard
            </Button>
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200"
              onClick={() => router.push("/about")}
            >
              <Info className="mr-2 h-4 w-4" /> About
            </Button>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <Avatar className="h-8 w-8 ring-2 ring-orange-500/30 hover:ring-orange-500/70 transition-all duration-200">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-rose-500">U</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
              onClick={() => router.push("/")}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section (Left Panel) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <Card className="bg-black/30 border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-glow-sm hover:shadow-glow transition-all duration-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="bg-gradient-to-r from-orange-400 to-rose-500 w-1 h-6 rounded mr-2"></span>
                  Prediction Parameters
                </h2>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isUsingLiveWeather}
                    onCheckedChange={(checked) => {
                      setIsUsingLiveWeather(checked)
                      if (!checked) {
                        setFormData({
                          temperature: "",
                          humidity: "",
                          windSpeed: "",
                          rainfall: "",
                          latitude: "",
                          longitude: "",
                          date: new Date(),
                        })
                      }
                    }}
                  />
                  <Button
                    onClick={() => setShowWeatherModal(true)}
                    disabled={isWeatherLoading}
                    className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white"
                  >
                    {isWeatherLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <CloudSun className="mr-2 h-4 w-4" />
                        Use Live Weather
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <Separator className="mb-6 bg-white/10" />

              {isUsingLiveWeather && (
                <div className="mb-4 p-3 bg-white/5 rounded-lg">
                  <p className="text-sm text-white/80">
                    Using live weather data for {weatherSource}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inputFields.map((field, index) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name} className="text-white/80 flex items-center gap-1.5">
                        <field.icon className="h-4 w-4 text-orange-400" />
                        {field.label}
                      </Label>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={field.value}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          className="bg-black/50 border-white/10 text-white placeholder:text-white/40 focus:border-orange-500/50 focus:ring-orange-500/20"
                          disabled={isUsingLiveWeather}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-orange-400" />
                    Date
                  </Label>
                  <DatePicker date={formData.date} onSelect={handleDateChange} />
                </div>

                <Button
                  onClick={handlePredict}
                  disabled={isLoading}
                  className={`w-full mt-6 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white shadow-glow-sm hover:shadow-glow hover:scale-105 transition-all duration-300 ${isLoading ? "animate-pulse" : ""}`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </div>
                  ) : (
                    "Predict Fire Risk"
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Results Section (Right Panel) */}
          <div className="lg:col-span-8">
            {showResult && predictionResult && (
              <>
                {/* Risk Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RiskDistribution
                    temperature={parseFloat(formData.temperature)}
                    humidity={parseFloat(formData.humidity)}
                    windSpeed={parseFloat(formData.windSpeed)}
                    rainfall={parseFloat(formData.rainfall)}
                    onPredict={() => {
                      // Reset the form to top
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      // Clear previous results
                      setShowResult(false);
                      setPredictionResult(null);
                      // Focus on first input
                      const firstInput = document.querySelector('input[name="temperature"]') as HTMLInputElement;
                      if (firstInput) firstInput.focus();
                    }}
                  />
                  <TemperatureImpact currentTemp={parseFloat(formData.temperature)} confidence={predictionResult?.confidence || 0} />
                </div>

                {/* Risk Metrics Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
                >
                  {/* Confidence Score */}
                  <Card className="bg-black/30 border-white/10 backdrop-blur-xl p-4 rounded-xl shadow-glow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white/70">Confidence Score</h3>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        predictionResult.confidence > 75 ? 'bg-red-500/20' :
                        predictionResult.confidence > 50 ? 'bg-orange-500/20' : 'bg-green-500/20'
                      }`}>
                        <span className="text-sm font-semibold">{Math.round(predictionResult.confidence)}%</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold mt-2">{Math.round(predictionResult.confidence)}%</p>
                    <p className="text-sm text-white/50 mt-1">Prediction accuracy</p>
                  </Card>

                  {/* Risk Level */}
                  <Card className="bg-black/30 border-white/10 backdrop-blur-xl p-4 rounded-xl shadow-glow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white/70">Risk Level</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        predictionResult.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {predictionResult.risk}
                      </div>
                    </div>
                    <p className="text-2xl font-bold mt-2">{predictionResult.risk}</p>
                    <p className="text-sm text-white/50 mt-1">Current risk status</p>
                  </Card>

                  {/* Response Time */}
                  <Card className="bg-black/30 border-white/10 backdrop-blur-xl p-4 rounded-xl shadow-glow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white/70">Response Time</h3>
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-sm font-semibold">⚡</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold mt-2">{"< 2s"}</p>
                    <p className="text-sm text-white/50 mt-1">Average prediction time</p>
                  </Card>

                  {/* Data Points */}
                  <Card className="bg-black/30 border-white/10 backdrop-blur-xl p-4 rounded-xl shadow-glow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white/70">Data Points</h3>
                      <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-sm font-semibold">📊</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold mt-2">6</p>
                    <p className="text-sm text-white/50 mt-1">Parameters analyzed</p>
                  </Card>
                </motion.div>

                {/* Map Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6"
                >
                  <RiskMap
                    latitude={parseFloat(formData.latitude)}
                    longitude={parseFloat(formData.longitude)}
                    risk={predictionResult.risk}
                  />
                </motion.div>

                {/* AI Chat Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6"
                >
                  <AnalysisAIChat predictionResult={predictionResult} userInputs={formData} />
                </motion.div>

                {/* News Widget */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <NewsWidget />
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Data Analysis Section */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8"
          >
            <Card className="bg-black/30 border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-glow-sm hover:shadow-glow transition-all duration-500">
              <Tabs defaultValue="analysis">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <span className="bg-gradient-to-r from-orange-400 to-rose-500 w-1 h-6 rounded mr-2"></span>
                    Fire Risk Analysis
                  </h2>
                  <TabsList className="bg-black/50 border border-white/5">
                    <TabsTrigger
                      value="analysis"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/20 data-[state=active]:to-rose-500/20 data-[state=active]:text-white"
                    >
                      Analysis
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/20 data-[state=active]:to-rose-500/20 data-[state=active]:text-white"
                    >
                      History
                    </TabsTrigger>
                    <TabsTrigger
                      value="map"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/20 data-[state=active]:to-rose-500/20 data-[state=active]:text-white"
                    >
                      Map
                    </TabsTrigger>
                  </TabsList>
                </div>
                <Separator className="mb-6 bg-white/10" />

                <TabsContent value="analysis" className="mt-0">
                  <FireAnalytics />
                </TabsContent>
                <TabsContent value="history" className="mt-0">
                  <div className="h-[400px] flex items-center justify-center text-white/60">
                    <div className="text-center space-y-4">
                      <BarChart className="h-16 w-16 mx-auto opacity-30" />
                      <p>Historical data will appear here</p>
                      <Button className="bg-gradient-to-r from-orange-500/30 to-rose-500/30 hover:from-orange-500/50 hover:to-rose-500/50 text-white transition-all duration-300 hover:scale-105">
                        Load History
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="map" className="mt-0">
                  <div className="h-[400px] flex items-center justify-center text-white/60">
                    <div className="text-center space-y-4">
                      <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-orange-400/30 to-rose-500/30 flex items-center justify-center animate-pulse-subtle">
                        <span className="text-2xl">🌍</span>
                      </div>
                      <p>Map visualization will appear here</p>
                      <Button className="bg-gradient-to-r from-orange-500/30 to-rose-500/30 hover:from-orange-500/50 hover:to-rose-500/50 text-white transition-all duration-300 hover:scale-105">
                        View Map
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </main>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        >
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 shadow-glow hover:shadow-glow-lg hover:scale-110 transition-all duration-300"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Chat Bot */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <Card className="w-full max-w-4xl h-[80vh] bg-black/30 border-white/10 backdrop-blur-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="bg-gradient-to-r from-orange-400 to-rose-500 w-1 h-6 rounded mr-2"></span>
                  AI Assistant
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowChat(false)}
                  className="text-white/80 hover:text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-hidden">
                <AnalysisAIChat
                  predictionResult={predictionResult}
                  userInputs={formData}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <WeatherModal
        isOpen={showWeatherModal}
        onClose={() => setShowWeatherModal(false)}
        onWeatherData={(data) => {
          setFormData({
            temperature: data.temperature.toString(),
            humidity: data.humidity.toString(),
            windSpeed: data.windSpeed.toString(),
            rainfall: data.rainfall.toString(),
            latitude: data.latitude.toString(),
            longitude: data.longitude.toString(),
            date: new Date(),
          })
        }}
      />

      {/* Add Toaster for notifications */}
      <Toaster />
    </div>
  )
}

