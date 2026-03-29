'use client'

import { motion } from 'framer-motion'
import { Users, Zap, Target, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate personalized pitches in seconds with AI-powered research',
    },
    {
      icon: Target,
      title: 'Hyper Targeted',
      description: 'Deep research into company data, news, and competitive landscape',
    },
    {
      icon: Users,
      title: 'Built for Teams',
      description: 'Seamless collaboration features for growing sales organizations',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="text-sm font-semibold text-primary mb-4 flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Dashboard
            </motion.button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">About ForgeSDR</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-16 space-y-16">
        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We&apos;re on a mission to transform how sales teams conduct outreach. By combining advanced AI research capabilities with proven sales techniques, we enable SDRs to spend less time on research and more time building relationships.
          </p>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              SDR Agent analyzes company websites, scans real-time news and updates, researches competitive landscapes, identifies pain points and opportunities, and generates personalized email pitches tailored to each prospect.
            </p>
            <p>
              All of this happens in just seconds, giving you more time to focus on relationship building and closing deals.
            </p>
          </div>
        </motion.section>

        {/* Our Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold text-foreground">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 + idx * 0.1 }}
                  className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-foreground">Why Choose SDR Agent?</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Save 5+ hours per week on research and email writing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Personalized pitches increase reply rates by up to 40%</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Real-time competitive and market intelligence at your fingertips</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Seamless integration with your existing sales tools</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Enterprise-grade security and data privacy</span>
            </li>
          </ul>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-8 bg-card border border-border rounded-lg text-center space-y-4"
        >
          <h3 className="text-xl font-bold text-foreground">Ready to Transform Your Sales Process?</h3>
          <p className="text-muted-foreground">Start your free trial today and see the difference AI can make.</p>
          <Link href="/pricing">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="inline-block px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all"
            >
              View Pricing
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
