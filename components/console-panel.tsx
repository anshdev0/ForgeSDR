'use client'

import { CheckCircle2, Circle, Loader2 } from 'lucide-react'

export interface ConsoleStep {
  id: string
  title: string
  status: 'pending' | 'running' | 'complete' | 'error'
  duration?: number
}

interface ConsolePanelProps {
  steps: ConsoleStep[]
  isRunning?: boolean
}

export function ConsolePanel({ steps }: ConsolePanelProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-orange-600 font-bold text-lg font-mono">{'>_'}</span>
        <h2 className="text-xl font-bold text-gray-900">Live Console</h2>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-4">
            <div className="mt-1">
              {step.status === 'complete' ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : step.status === 'running' ? (
                <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </div>
            
            <div className="flex-1">
              <p className={`font-medium ${
                step.status === 'complete' ? 'text-green-700' : 
                step.status === 'running' ? 'text-orange-600' : 'text-gray-400'
              }`}>
                {step.title}
              </p>
              {step.duration && step.status === 'complete' && (
                <p className="text-xs text-gray-400 font-mono">
                  ({step.duration.toFixed(2)}ms)
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {steps.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm italic">
          <p>Ready for a new lead...</p>
        </div>
      )}
    </div>
  )
}