"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, Globe, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion } from "@/components/motion"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Create fire particles
    const createParticle = () => {
      if (typeof window === "undefined") return

      const particle = document.createElement("div")
      particle.classList.add("fire-particle")

      // Random position
      const posX = Math.random() * window.innerWidth
      const posY = Math.random() * window.innerHeight

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

  if (!mounted) return null

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden font-urbanist">
      {/* Premium animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-red-900 to-orange-900 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] mix-blend-overlay opacity-10"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/30 animate-pulse-slow"></div>
      </div>

      {/* Navbar with glassmorphism */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-glow-lg">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">FireSight</span>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-6"
          >
            
              
            
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition-colors hover:scale-105 transform duration-200"
            >
              About
            </Link>
            
            <Link
              href="/contact"
              className="text-white/80 hover:text-white transition-colors hover:scale-105 transform duration-200"
            >
              Contact
            </Link>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 hover:scale-105 transition-all duration-200"
            >
              Login
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white shadow-glow-sm hover:shadow-glow hover:scale-105 transition-all duration-200">
              Sign Up
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero section with enhanced animations */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-white leading-tight tracking-tight animate-pulse-subtle"
          >
            Predict Wildfire Risk with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Get instant predictions based on temperature, humidity, and wind. Our advanced AI model provides accurate
            forecasts to help you stay safe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-6"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white px-8 py-7 text-lg rounded-full shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300 group"
            >
              <Link href="/dashboard">
                Start Now{" "}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating stats cards */}
        
      </main>

      {/* Footer with glassmorphism */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white/60 text-sm">© 2025 FireSight. All rights reserved.</div>
            <div className="flex items-center gap-8">
              <Link
                href="/about"
                className="text-white/60 hover:text-white text-sm transition-colors hover:scale-105 transform duration-200"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors hover:scale-105 transform duration-200"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors hover:scale-105 transform duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-white/60 hover:text-white text-sm transition-colors hover:scale-105 transform duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}