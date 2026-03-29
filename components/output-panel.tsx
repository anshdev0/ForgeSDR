'use client'

import { Mail, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface OutputPanelProps {
  emailContent: string
  tokenUsage: number
  processingTime: number
  isLoading: boolean
}

export function OutputPanel({ emailContent, tokenUsage, processingTime, isLoading }: OutputPanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(emailContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent("Question about your recent update")
    const body = encodeURIComponent(emailContent)
    // Opens default system email client (Outlook, Gmail, Apple Mail, etc)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 flex flex-col shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Email Preview</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all text-gray-500"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {!emailContent && !isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-4">
            <Mail className="w-12 h-12 opacity-20" />
            <p className="text-sm italic">Generate a pitch to see it here</p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
            {emailContent}
          </div>
        )}
      </div>

      {/* Stats Footer (Restored) */}
      <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1 p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400">Time</span>
            <span className="text-sm font-bold text-orange-600">{(processingTime / 1000).toFixed(1)}s</span>
          </div>
          <div className="flex-1 p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400">Tokens</span>
            <span className="text-sm font-bold text-gray-700">{tokenUsage}</span>
          </div>
        </div>

        <button 
          onClick={handleSendEmail}
          disabled={!emailContent}
          className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-700 disabled:bg-gray-200 disabled:cursor-not-allowed shadow-lg shadow-orange-100 transition-all"
        >
          <Mail className="w-5 h-5" />
          Send in Mail App
        </button>
      </div>
    </div>
  )
}