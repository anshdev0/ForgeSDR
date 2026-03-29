'use client'

import { Lead } from './types'
import { History, LogOut, PlusCircle, Briefcase } from 'lucide-react'

interface SidebarProps {
  leads: Lead[]
  onSelectLead: (lead: Lead) => void
  onLogout: () => void
}

export function Sidebar({ leads, onSelectLead, onLogout }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shadow-sm">
      <div className="p-6">
        <button 
          onClick={() => window.location.reload()} 
          className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
        >
          <PlusCircle className="w-5 h-5" />
          New Research
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex items-center gap-2 mb-4 px-2 text-gray-400 uppercase text-[10px] font-bold tracking-widest">
          <History className="w-3 h-3" />
          History
        </div>
        
        <div className="space-y-2">
          {leads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => onSelectLead(lead)}
              className="w-full text-left p-3 rounded-xl border border-transparent hover:border-orange-100 hover:bg-orange-50/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white">
                  <Briefcase className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold text-gray-700 truncate">
                    {lead.companyUrl.replace(/^(https?:\/\/)?(www\.)?/, '')}
                  </p>
                  <p className="text-[10px] text-gray-400">{lead.timestamp}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}