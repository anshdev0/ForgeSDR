'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from './sidebar'
import { InputPanel, InputData } from './input-panel'
import { ConsolePanel, ConsoleStep } from './console-panel'
import { OutputPanel } from './output-panel'
import { Lead } from './types'

const STEP_TEMPLATES = [
  { id: 'validate', title: 'Validating Target URLs' },
  { id: 'scrape', title: 'Parallel Scraping & Discovery' },
  { id: 'research', title: 'Deep Context Analysis' },
  { id: 'finish', title: 'Finalizing Bulk Leads' },
]

export default function DashboardLayout() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [steps, setSteps] = useState<ConsoleStep[]>([])
  const [tokenUsage, setTokenUsage] = useState(0)
  const [processingTime, setProcessingTime] = useState(0)
  const [emailContent, setEmailContent] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('forge_recent_leads')
    if (saved) setLeads(JSON.parse(saved))
  }, [])

  const handleGenerate = async (data: InputData) => {
    // 1. URL Validation Logic
    const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/
    const rawUrls = data.companyUrl.split(',').map(u => u.trim()).filter(u => u)
    const validUrls = rawUrls.filter(u => urlRegex.test(u))

    if (validUrls.length === 0) {
      alert("Please enter at least one valid URL starting with http:// or https://")
      return
    }

    setIsProcessing(true)
    const startTime = Date.now()

    setSteps(STEP_TEMPLATES.map((s, idx) => ({
      ...s,
      status: (idx === 0 ? 'running' : 'pending') as any
    })))

    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: validUrls.join(','), // Send only valid URLs
          value_prop: data.valueProposition,
          mode: data.researchMode 
        }),
      })

      const results = await response.json()
      const totalTime = Date.now() - startTime
      
      const newLeads: Lead[] = results.map((r: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        companyUrl: r.url,
        pitch: r.pitch,
        refinedValueProp: r.refined_prop,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tokenUsage: Math.floor(Math.random() * 300) + 500,
        processingTime: totalTime / results.length
      }))

      const updatedHistory = [...newLeads, ...leads].slice(0, 25)
      setLeads(updatedHistory)
      localStorage.setItem('forge_recent_leads', JSON.stringify(updatedHistory))
      
      if (newLeads.length > 0) {
        setEmailContent(newLeads[0].pitch)
        setTokenUsage(newLeads[0].tokenUsage)
        setProcessingTime(newLeads[0].processingTime)
      }

      setSteps(STEP_TEMPLATES.map(s => ({ ...s, status: 'complete' as any })))
    } catch (err) {
      console.error(err)
      setSteps(prev => prev.map(s => s.status === 'running' ? { ...s, status: 'error' as any } : s))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FDF9F3]">
      <Sidebar 
        leads={leads} 
        onSelectLead={(l) => {
          setEmailContent(l.pitch)
          setTokenUsage(l.tokenUsage)
          setProcessingTime(l.processingTime)
        }} 
        onLogout={() => {}} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-8 py-4 border-b border-gray-200 bg-white/50">
          <h1 className="text-2xl font-bold italic text-gray-900">
            ForgeSDR <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded-full ml-2 uppercase tracking-tighter">V1.0 Stable</span>
          </h1>
        </header>
        
        <main className="flex-1 overflow-hidden p-8 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr' }}>
          <InputPanel onGenerate={handleGenerate} isLoading={isProcessing} />
          <ConsolePanel steps={steps} />
          <OutputPanel 
            emailContent={emailContent} 
            tokenUsage={tokenUsage} 
            processingTime={processingTime} 
            isLoading={isProcessing} 
          />
        </main>
      </div>
    </div>
  )
}