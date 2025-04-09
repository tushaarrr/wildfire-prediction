"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, Bot, User, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { motion } from "@/components/motion"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatBotProps {
  onClose: () => void
}

export function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your FireSight AI assistant. I can help explain your fire risk prediction and answer questions about wildfire safety. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showChatbot, setShowChatbot] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0)
  const [typingComplete, setTypingComplete] = useState(false)
  const [pendingResponse, setPendingResponse] = useState("")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typingText])

  // Animation for chatbot entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatbot(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Typewriter effect for bot responses
  useEffect(() => {
    if (pendingResponse && !typingComplete) {
      if (currentTypingIndex < pendingResponse.length) {
        const timer = setTimeout(() => {
          setTypingText(pendingResponse.substring(0, currentTypingIndex + 1))
          setCurrentTypingIndex((prev) => prev + 1)
        }, 15) // Speed of typing

        return () => clearTimeout(timer)
      } else {
        setTypingComplete(true)

        // Add the complete message to the messages array
        const newBotMessage: Message = {
          id: messages.length + 2,
          text: pendingResponse,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, newBotMessage])
        setIsTyping(false)
        setPendingResponse("")
        setTypingText("")
        setCurrentTypingIndex(0)
        setTypingComplete(false)
      }
    }
  }, [pendingResponse, currentTypingIndex, typingComplete, messages, typingText])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = ""

      if (input.toLowerCase().includes("risk")) {
        botResponse =
          "Based on the parameters you've entered, the fire risk is high. The combination of high temperature (32°C), low humidity (45%), and moderate wind speed (15 km/h) creates conditions that are favorable for wildfire ignition and rapid spread. I recommend taking precautions and monitoring local fire alerts."
      } else if (input.toLowerCase().includes("safety") || input.toLowerCase().includes("tips")) {
        botResponse =
          "Here are some wildfire safety tips:\n\n1. Create a defensible space around your home\n2. Have an emergency evacuation plan ready\n3. Keep emergency supplies and important documents accessible\n4. Stay informed about local fire conditions and warnings\n5. Follow evacuation orders immediately if issued"
      } else if (input.toLowerCase().includes("temperature") || input.toLowerCase().includes("impact")) {
        botResponse =
          "Temperature has a significant impact on fire risk. Higher temperatures increase the dryness of vegetation, making it more susceptible to ignition. In your case, 32°C is considered high risk, especially when combined with low humidity and wind."
      } else {
        botResponse =
          "I'm here to help with your wildfire risk assessment. You can ask me about the factors affecting your risk level, safety precautions, or how to interpret the prediction results."
      }

      // Start the typewriter effect
      setPendingResponse(botResponse)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] z-50"
    >
      <Card
        className={`bg-black/80 border-white/10 backdrop-blur-xl rounded-xl overflow-hidden flex flex-col shadow-glow transition-all duration-500 h-full ${showChatbot ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        <div className="p-3 border-b border-white/10 bg-gradient-to-r from-black/90 to-slate-800/90 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-glow-sm">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium">FireSight Assistant</h3>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                <p className="text-xs text-white/60">Online</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-glow-sm"
                      : "bg-black/60 text-white border border-white/5 shadow-md backdrop-blur-sm"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === "bot" ? (
                      <Bot className="h-4 w-4 text-orange-400" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-70">{message.sender === "user" ? "You" : "FireSight AI"}</span>
                    {message.sender === "bot" && (
                      <Badge className="h-4 text-[10px] bg-orange-500/20 text-orange-400 ml-auto">AI</Badge>
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <div className="text-right mt-1">
                    <span className="text-xs opacity-50">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="bg-black/60 text-white rounded-lg p-3 max-w-[80%] border border-white/5 shadow-md backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="h-4 w-4 text-orange-400" />
                    <span className="text-xs opacity-70">FireSight AI</span>
                    <Badge className="h-4 text-[10px] bg-orange-500/20 text-orange-400 ml-auto">AI</Badge>
                  </div>
                  {typingText ? (
                    <p className="text-sm whitespace-pre-line">{typingText}</p>
                  ) : (
                    <div className="flex gap-1.5 py-2">
                      <span className="w-2 h-2 rounded-full bg-orange-400 opacity-80 animate-bounce"></span>
                      <span
                        className="w-2 h-2 rounded-full bg-orange-400 opacity-80 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-orange-400 opacity-80 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-white/10 bg-gradient-to-r from-black/90 to-slate-800/90 backdrop-blur-xl">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="bg-white/5 border-white/10 text-white pr-16 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200"
                disabled={isTyping}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSend}
              size="icon"
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white shadow-glow-sm hover:shadow-glow hover:scale-105 transition-all duration-200"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

