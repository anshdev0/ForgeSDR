'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for solo SDRs and small teams',
      features: [
        'Up to 100 leads/month',
        'Basic email generation',
        'Quick scan research mode',
        'Email export (CSV)',
        'Email support',
      ],
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      description: 'Ideal for growing sales teams',
      features: [
        'Up to 1,000 leads/month',
        'Advanced email generation',
        'Deep scan research mode',
        'CSV & PDF export',
        'Priority support',
        'Team collaboration',
        'Custom tone templates',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large-scale operations',
      features: [
        'Unlimited leads',
        'All Professional features',
        'API access',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations',
        'Advanced analytics',
      ],
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
          <h1 className="text-3xl font-bold text-foreground">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground mt-2">Choose the perfect plan for your sales team</p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative rounded-xl border transition-all ${
                plan.popular
                  ? 'border-primary bg-card shadow-lg scale-105'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </div>

                <button
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:opacity-90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Get Started
                </button>

                <div className="space-y-3 border-t border-border pt-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-8 py-16">
        <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I change plans anytime?', a: 'Yes, upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.' },
            { q: 'Is there a free trial?', a: 'Absolutely! Start with our 14-day free trial on any plan with full access to all features.' },
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, bank transfers, and popular payment platforms.' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-4 bg-card border border-border rounded-lg"
            >
              <p className="font-semibold text-foreground mb-2">{item.q}</p>
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
