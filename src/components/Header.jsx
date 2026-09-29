import { Bell, Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useFinance } from '../finance'

const TITLES = {
  overview: ['Good morning, Aria', 'Your money, in motion.'],
  cards: ['Your cards', 'Manage limits, freeze, and rewards.'],
  payments: ['Move money', 'Send, request, and schedule with ease.'],
  transactions: ['Activity', 'Every settlement, in one quiet ledger.'],
  insights: ['Insights', 'Where your spending actually goes.'],
}

export default function Header({ page, setOpen, query, setQuery }) {
  const [title, subtitle] = TITLES[page]
  const { notices, unread, clearUnread } = useFinance()
  const [showNotices, setShowNotices] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center gap-3 border-b border-line bg-[#061018]/80 px-3 py-4 backdrop-blur-xl sm:px-5 lg:px-6">
      <button
        type="button"
        className="grid h-11 w-11 place-items-center rounded-2xl border border-line text-slate-200 lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-2xl text-white sm:text-3xl">{title}</p>
        <p className="truncate text-sm text-slate-400">{subtitle}</p>
      </div>

      <label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-line bg-white/4 px-3 py-2 sm:max-w-80 sm:flex-none">
        <Search size={16} className="shrink-0 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search activity…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
        />
        {query && (
          <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>
            <X size={14} className="text-slate-400" />
          </button>
        )}
      </label>

      <div className="relative">
        <button
          type="button"
          className="relative grid h-11 w-11 place-items-center rounded-2xl border border-line hover:border-mint/50"
          onClick={() => {
            setShowNotices((open) => !open)
            clearUnread()
          }}
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unread > 0 && <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-mint" />}
        </button>
        {showNotices && (
          <div className="absolute right-0 z-40 mt-2 w-72 rounded-2xl border border-line bg-[#0b1822] p-3 shadow-2xl">
            <p className="mb-2 text-xs tracking-wide text-slate-400 uppercase">Alerts</p>
            {notices.length === 0 && <p className="text-sm text-slate-400">No alerts yet.</p>}
            <ul className="max-h-72 space-y-2 overflow-auto">
              {notices.map((note) => (
                <li key={note.id} className="rounded-xl bg-white/4 px-3 py-2">
                  <p className="text-sm">{note.text}</p>
                  <p className="text-xs text-slate-500">{note.time}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
