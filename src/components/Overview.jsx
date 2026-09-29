import { motion } from 'framer-motion'
import { ArrowDownLeft, ArrowUpRight, Plus, QrCode, Send, Wallet } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CATEGORIES, SPENDING, STATS } from '../data'
import { useFinance } from '../finance'
import AnimatedNumber from './AnimatedNumber'

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Overview({ setPage }) {
  const { totalAvailable, activeCard, transactions, contacts, openPayments } = useFinance()
  const goPay = (mode, to) => {
    openPayments({ mode, to })
    setPage('payments')
  }

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <motion.section
        custom={0}
        variants={fade}
        initial="hidden"
        animate="show"
        className="shine glass relative overflow-hidden rounded-3xl p-6 lg:col-span-8"
      >
        <div className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-mint/20 blur-3xl" />
        <p className="text-sm tracking-wide text-slate-400 uppercase">Total available</p>
        <p className="mt-3 font-display text-5xl text-white sm:text-6xl">
          <AnimatedNumber value={totalAvailable} prefix="$" decimals={2} />
        </p>
        <p className="mt-3 text-sm text-mint">Live across all cards</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Send, label: 'Send', mode: 'send' },
            { icon: ArrowDownLeft, label: 'Request', mode: 'request' },
            { icon: Plus, label: 'Top up', mode: 'topup' },
            { icon: QrCode, label: 'Scan', mode: 'scan' },
          ].map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => goPay(action.mode)}
              className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm transition hover:-translate-y-0.5 hover:border-mint/40 hover:bg-mint/10"
            >
              <action.icon size={16} className="text-mint" />
              {action.label}
            </button>
          ))}
        </div>
      </motion.section>

      <motion.section
        custom={1}
        variants={fade}
        initial="hidden"
        animate="show"
        className="glass floaty rounded-3xl p-5 lg:col-span-4"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-300">Primary card</p>
          <Wallet size={16} className="text-gold" />
        </div>
        <div
          className={`shine min-h-[168px] cursor-pointer rounded-3xl bg-gradient-to-br ${activeCard.gradient} p-5 text-ink shadow-lg`}
          onClick={() => setPage('cards')}
          onKeyDown={(e) => e.key === 'Enter' && setPage('cards')}
          role="button"
          tabIndex={0}
        >
          <p className="text-sm/none font-medium opacity-80">{activeCard.name}</p>
          <p className="mt-8 font-mono text-lg tracking-[0.28em]">•••• {activeCard.last4}</p>
          <div className="mt-8 flex justify-between text-xs">
            <span>{activeCard.holder}</span>
            <span>${activeCard.balance.toFixed(0)}</span>
          </div>
        </div>
      </motion.section>

      {STATS.map((stat, i) => (
        <motion.article
          key={stat.key}
          custom={i + 2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="glass shine rounded-3xl p-5 lg:col-span-3"
        >
          <p className="text-sm text-slate-400">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold">
            <AnimatedNumber
              value={stat.value}
              prefix={stat.prefix || ''}
              suffix={stat.suffix || ''}
              decimals={stat.suffix === '%' ? 1 : 0}
            />
          </p>
          <p
            className={`mt-2 inline-flex items-center gap-1 text-xs ${
              stat.delta >= 0 ? 'text-mint' : 'text-rose-300'
            }`}
          >
            {stat.delta >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
            {Math.abs(stat.delta)}% vs last month
          </p>
        </motion.article>
      ))}

      <motion.section
        custom={6}
        variants={fade}
        initial="hidden"
        animate="show"
        className="glass rounded-3xl p-5 lg:col-span-8"
      >
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-medium">Cashflow</h2>
            <p className="text-sm text-slate-400">Income vs spend, last 6 months</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SPENDING}>
              <defs>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5eead4" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#5eead4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="spend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f5d38a" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f5d38a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,197,214,0.08)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#0b1822',
                  border: '1px solid rgba(148,197,214,0.2)',
                  borderRadius: 12,
                }}
              />
              <Area type="monotone" dataKey="income" stroke="#5eead4" fill="url(#income)" />
              <Area type="monotone" dataKey="spend" stroke="#f5d38a" fill="url(#spend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      <motion.section
        custom={7}
        variants={fade}
        initial="hidden"
        animate="show"
        className="glass rounded-3xl p-5 lg:col-span-4"
      >
        <h2 className="text-lg font-medium">Spending mix</h2>
        <div className="mx-auto h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={CATEGORIES} dataKey="value" innerRadius={48} outerRadius={72} paddingAngle={4}>
                {CATEGORIES.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#0b1822',
                  border: '1px solid rgba(148,197,214,0.2)',
                  borderRadius: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-2 text-sm">
          {CATEGORIES.map((c) => (
            <li key={c.name} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <i className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                {c.name}
              </span>
              <span className="text-slate-400">${c.value}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section
        custom={8}
        variants={fade}
        initial="hidden"
        animate="show"
        className="glass rounded-3xl p-5 lg:col-span-7"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Recent activity</h2>
          <button
            type="button"
            className="text-sm text-mint hover:underline"
            onClick={() => setPage('transactions')}
          >
            View all
          </button>
        </div>
        <ul className="space-y-1">
          {transactions.slice(0, 6).map((tx) => (
            <li
              key={tx.id}
              className="flex cursor-pointer items-center justify-between rounded-2xl px-2 py-3 transition hover:bg-white/5"
              onClick={() => setPage('transactions')}
            >
              <div>
                <p className="text-sm font-medium">{tx.merchant}</p>
                <p className="text-xs text-slate-400">
                  {tx.category} · {tx.date}
                </p>
              </div>
              <p className={`font-medium ${tx.amount > 0 ? 'text-mint' : 'text-white'}`}>
                {tx.amount > 0 ? '+' : ''}
                {tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </p>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section
        custom={9}
        variants={fade}
        initial="hidden"
        animate="show"
        className="glass rounded-3xl p-5 lg:col-span-5"
      >
        <h2 className="text-lg font-medium">Quick send</h2>
        <p className="mt-1 text-sm text-slate-400">Favorite people, one tap away.</p>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {contacts.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => goPay('send', c.name)}
              className="group flex flex-col items-center gap-2"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-mint/30 bg-mint/10 text-sm font-semibold transition group-hover:-translate-y-1 group-hover:bg-mint group-hover:text-ink">
                {c.initials}
              </span>
              <span className="w-full truncate text-center text-xs text-slate-400">{c.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
