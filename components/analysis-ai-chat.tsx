"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "@/components/motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

interface AnalysisAIChatProps {
  predictionResult: {
    risk: "High" | "Low";
    confidence: number;
    factors: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      rainfall: number;
    };
  } | null;
  userInputs: {
    temperature: string;
    humidity: string;
    windSpeed: string;
    rainfall: string;
    latitude: string;
    longitude: string;
    date: Date;
  };
}

export function AnalysisAIChat({ predictionResult, userInputs }: AnalysisAIChatProps) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hello! I can help you understand the wildfire risk prediction and provide recommendations. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          predictionResult,
          userInputs,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      <Card className="bg-black/30 border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-glow-sm hover:shadow-glow transition-all duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-glow-sm">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Ask Our AI About the Analysis</h2>
            <p className="text-white/70 text-sm">
              Get insights and answers about wildfire trends, causes, and safety based on the data above.
            </p>
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-lg h-[300px] mb-4 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${message.role === "assistant" ? "flex-row" : "flex-row-reverse"}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.role === "assistant" ? "/ai-avatar.png" : "/user-avatar.png"} />
                    <AvatarFallback className={message.role === "assistant" ? "bg-orange-500" : "bg-blue-500"}>
                      {message.role === "assistant" ? "AI" : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === "assistant"
                        ? "bg-white/5 text-white"
                        : "bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/ai-avatar.png" />
                    <AvatarFallback className="bg-orange-500">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-white/40 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 rounded-full bg-white/40 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 rounded-full bg-white/40 animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-3 border-t border-white/10 bg-black/40">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-black/50 border-white/10 text-white placeholder:text-white/40 focus:border-orange-500/50 focus:ring-orange-500/20"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

