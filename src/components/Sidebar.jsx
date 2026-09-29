import {
  ArrowLeftRight,
  CreditCard,
  LayoutDashboard,
  LogOut,
  PieChart,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import { NAV } from '../data'

const ICONS = {
  overview: LayoutDashboard,
  cards: CreditCard,
  payments: Send,
  transactions: ArrowLeftRight,
  insights: PieChart,
}

export default function Sidebar({ page, setPage, open, setOpen, collapsed, setCollapsed }) {
  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-svh flex-col border-r border-line bg-[#07141c]/95 px-3 py-5 backdrop-blur-xl transition-[width,transform] duration-300 ${
          collapsed ? 'lg:w-[88px]' : 'lg:w-[260px]'
        } w-[min(86vw,280px)] ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-mint/15 text-mint shadow-[0_0_24px_rgba(94,234,212,0.25)]">
              <Sparkles size={18} />
            </div>
            <div className={collapsed ? 'lg:hidden' : ''}>
              <p className="font-display text-xl leading-none text-white">National</p>
              <p className="mt-1 text-[11px] tracking-[0.22em] text-slate-400 uppercase">
                Private bank
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-1 text-slate-400 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const Icon = ICONS[item.id]
            const active = page === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setPage(item.id)
                  setOpen(false)
                }}
                className={`relative flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                  active
                    ? 'bg-mint text-ink shadow-[0_8px_24px_rgba(94,234,212,0.28)]'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="relative z-10 shrink-0" size={18} />
                <span className={`relative z-10 text-sm font-medium ${collapsed ? 'lg:hidden' : ''}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="mt-4 space-y-3 px-1">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="hidden w-full rounded-2xl border border-line px-3 py-2 text-xs text-slate-400 hover:text-white lg:block"
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-white/4 p-3">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80"
              alt="Aria Bennett"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
              <p className="truncate text-sm font-medium">Aria Bennett</p>
              <p className="truncate text-xs text-slate-400">Premium member</p>
            </div>
            <LogOut className={`ml-auto text-slate-500 ${collapsed ? 'lg:hidden' : ''}`} size={16} />
          </div>
        </div>
      </aside>
    </>
  )
}
