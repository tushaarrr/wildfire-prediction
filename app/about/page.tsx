"use client";

import Link from "next/link";
import { motion } from "@/components/motion";
import { ArrowLeft, Thermometer, Droplets, Wind, CloudRain, MapPin, Globe, Database, Brain, LineChart, Map, MessageSquare, Rocket, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function About() {
  const features = [
    { icon: Database, title: "Global Dataset", description: "Covers over 30 years of wildfire events from across the world" },
    { icon: Brain, title: "Trained Classifier", description: "Predicts wildfire risk based on real inputs" },
    { icon: LineChart, title: "Real-Time Visualizations", description: "Risk score, temperature impact, fire occurrence trends" },
    { icon: Map, title: "Interactive Maps", description: "Shows fire-prone regions based on your input" },
    { icon: MessageSquare, title: "AI Chat Assistant", description: "Explains results, risks, and precautionary measures using OpenAI" }
  ]

  const environmentalFactors = [
    { icon: Thermometer, title: "Temperature" },
    { icon: Droplets, title: "Humidity" },
    { icon: Wind, title: "Wind Speed" },
    { icon: CloudRain, title: "Rainfall" },
    { icon: MapPin, title: "Location" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950 text-white relative overflow-hidden font-urbanist">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] mix-blend-overlay opacity-5"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Navbar with glassmorphism */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-2">
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
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              asChild
              variant="ghost"
              className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200"
            >
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-12 w-12 rounded-xl flex items-center justify-center">
              <img 
                src="/firesight-logo.png" 
                alt="FireSight Logo" 
                className="h-full w-full object-contain"
                style={{ filter: 'brightness(1.2)' }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">About FireSight</h1>
              <p className="text-white/70">AI-powered wildfire prediction platform</p>
            </div>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-white/80 leading-relaxed">
                FireSight is a global AI-powered wildfire prediction platform that uses real-world environmental inputs and decades of wildfire occurrence data to assess fire risk in any region of the world.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Whether you're a researcher, student, policymaker, or concerned citizen — FireSight helps you visualize and understand wildfire threats based on geolocation and weather data in real time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Globe className="h-6 w-6 text-orange-400" /> What We Do
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                FireSight analyzes key environmental factors such as:
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {environmentalFactors.map((factor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="bg-black/20 p-4 rounded-lg flex items-center gap-3"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400/20 to-rose-500/20 flex items-center justify-center">
                      <factor.icon className="h-5 w-5 text-orange-400" />
                    </div>
                    <span className="text-lg">{factor.title}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-lg text-white/80 leading-relaxed">
                Using these inputs, our machine learning model — trained on a global wildfire dataset from 1982 to 2014 — predicts whether wildfire conditions are likely to exist at a given location.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Brain className="h-6 w-6 text-orange-400" /> Powered by Machine Learning
              </h2>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="bg-black/20 p-6 rounded-lg flex items-start gap-4"
                  >
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-orange-500/20 to-rose-500/20 p-2.5 flex-shrink-0">
                      <feature.icon className="h-full w-full text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                      <p className="text-white/70 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Globe className="h-6 w-6 text-orange-400" /> Why Use FireSight?
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-center p-6 rounded-lg bg-black/20"
                >
                  <Globe className="h-8 w-8 mx-auto mb-4 text-orange-400" />
                  <h3 className="font-semibold mb-3 text-lg">Global Coverage</h3>
                  <p className="text-white/70 text-base leading-relaxed">Supports any latitude, longitude combination worldwide</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-center p-6 rounded-lg bg-black/20"
                >
                  <Rocket className="h-8 w-8 mx-auto mb-4 text-orange-400" />
                  <h3 className="font-semibold mb-3 text-lg">Fast Interface</h3>
                  <p className="text-white/70 text-base leading-relaxed">Clean and fast interface with real-time updates</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <User className="h-6 w-6 text-orange-400" /> Built By
              </h2>

              <div className="bg-black/20 p-8 rounded-lg">
                <p className="text-lg text-white/80 leading-relaxed mb-8">
                  Tushar Shandilya & Nandini Goyal — machine learning students passionate about applying AI to solve climate and environmental challenges around the world.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex items-center gap-4 bg-black/30 p-6 rounded-lg"
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400/30 to-rose-500/30 flex items-center justify-center">
                      <User className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Tushar Shandilya</h3>
                      <a href="mailto:tusharsharma25214@gmail.com" className="text-orange-400 hover:text-orange-300 transition-colors text-sm">
                        tusharsharma25214@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex items-center gap-4 bg-black/30 p-6 rounded-lg"
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400/30 to-rose-500/30 flex items-center justify-center">
                      <User className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Nandini Goyal</h3>
                      <p className="text-white/70 text-sm">Machine Learning Student</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center"
          >
            <p className="text-white/60">© 2025 FireSight. All rights reserved.</p>
            <div className="flex gap-4">
              <Button
                asChild
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white"
              >
                <Link href="/dashboard">Try FireSight</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}