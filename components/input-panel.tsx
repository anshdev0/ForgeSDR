'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Linkedin, Zap } from 'lucide-react'

interface InputPanelProps {
  onGenerate: (data: InputData) => void
  isLoading?: boolean
}

export interface InputData {
  companyUrl: string
  linkedinProfile: string
  valueProposition: string
  researchMode: 'quick' | 'deep'
}

export function InputPanel({ onGenerate, isLoading = false }: InputPanelProps) {
  const [formData, setFormData] = useState<InputData>({
    companyUrl: '',
    linkedinProfile: '',
    valueProposition: '',
    researchMode: 'quick',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyUrl.trim()) {
      newErrors.companyUrl = 'Company URL is required'
    } else if (!isValidUrl(formData.companyUrl)) {
      newErrors.companyUrl = 'Please enter a valid URL'
    }

    if (!formData.valueProposition.trim()) {
      newErrors.valueProposition = 'Value proposition is required'
    } else if (formData.valueProposition.trim().length < 10) {
      newErrors.valueProposition = 'Value proposition must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onGenerate(formData)
    }
  }

  const handleChange = (field: keyof InputData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col bg-card border border-border rounded-xl p-6"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2"
      >
        <Zap className="w-5 h-5 text-primary" />
        Target Setup
      </motion.h2>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
        {/* Company URL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-foreground">
            <span className="flex items-center gap-1.5 mb-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              Target Company URL
            </span>
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={formData.companyUrl}
            onChange={(e) => handleChange('companyUrl', e.target.value)}
            onFocus={() => setFocusedField('companyUrl')}
            onBlur={() => setFocusedField(null)}
            placeholder="https://example.com"
            className={`w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.companyUrl ? 'border-destructive focus:ring-destructive' : ''}`}
          />
          {errors.companyUrl && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive"
            >
              {errors.companyUrl}
            </motion.p>
          )}
        </motion.div>

        {/* LinkedIn Profile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-foreground">
            <span className="flex items-center gap-1.5 mb-2">
              <Linkedin className="w-4 h-4 text-muted-foreground" />
              LinkedIn Profile <span className="text-muted-foreground text-xs">(Optional)</span>
            </span>
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={formData.linkedinProfile}
            onChange={(e) => handleChange('linkedinProfile', e.target.value)}
            onFocus={() => setFocusedField('linkedinProfile')}
            onBlur={() => setFocusedField(null)}
            placeholder="https://linkedin.com/in/..."
            className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Your Value Proposition
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            value={formData.valueProposition}
            onChange={(e) => handleChange('valueProposition', e.target.value)}
            onFocus={() => setFocusedField('valueProposition')}
            onBlur={() => setFocusedField(null)}
            placeholder="Describe what makes your solution unique and valuable..."
            className={`w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none h-24 ${errors.valueProposition ? 'border-destructive focus:ring-destructive' : ''}`}
          />
          {errors.valueProposition && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive"
            >
              {errors.valueProposition}
            </motion.p>
          )}
        </motion.div>

        {/* Research Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-3 p-4 bg-secondary/20 rounded-lg border border-border"
        >
          <label className="block text-sm font-medium text-foreground">Research Mode</label>
          <div className="flex gap-3">
            {(['quick', 'deep'] as const).map((mode) => (
              <motion.button
                key={mode}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChange('researchMode', mode)}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  formData.researchMode === mode
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {mode === 'quick' ? 'Quick Scan' : 'Deep Scan'}
              </motion.button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {formData.researchMode === 'quick'
              ? 'Fast analysis using real-time web search'
              : 'Comprehensive deep dive with extended research'}
          </p>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-auto pt-4"
        >
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Generate Outreach
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  )
}
