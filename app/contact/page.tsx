"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "@/components/motion";
import { Mail, Send, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

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
          className="max-w-2xl mx-auto space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 mb-12"
          >
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">Contact Us</h1>
              <p className="text-white/70 text-lg">Have questions or feedback? We'd love to hear from you.</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3"
            >
              <Label htmlFor="name" className="text-base">Your Name</Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="bg-black/20 border-white/10 h-12 text-base"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3"
            >
              <Label htmlFor="email" className="text-base">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="bg-black/20 border-white/10 h-12 text-base"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-3"
            >
              <Label htmlFor="subject" className="text-base">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className="bg-black/20 border-white/10 h-12 text-base"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-3"
            >
              <Label htmlFor="message" className="text-base">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Your message..."
                className="bg-black/20 border-white/10 min-h-[180px] resize-none text-base leading-relaxed"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="pt-4"
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 h-14 text-lg font-medium"
              >
                <Send className="mr-3 h-5 w-5" /> Send Message
              </Button>
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 pt-12 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="space-y-2"
              >
                <h3 className="text-xl font-semibold">Email Us Directly</h3>
                <a
                  href="mailto:tusharsharma25214@gmail.com"
                  className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-3 text-base"
                >
                  <Mail className="h-5 w-5" /> tusharsharma25214@gmail.com
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="bg-black/20 border-white/10 text-white hover:bg-black/30 h-12 text-base"
                >
                  <Link href="/about">Learn more about FireSight</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}