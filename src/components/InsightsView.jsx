import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CATEGORIES, SPENDING } from '../data'
import AnimatedNumber from './AnimatedNumber'

export default function InsightsView() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <article className="glass rounded-3xl p-6 lg:col-span-4">
        <p className="text-sm text-slate-400">Projected surplus</p>
        <p className="mt-2 font-display text-5xl">
          <AnimatedNumber value={5234} prefix="$" />
        </p>
        <p className="mt-3 text-sm text-mint">You are 18% ahead of last September.</p>
      </article>
      <article className="glass rounded-3xl p-6 lg:col-span-4">
        <p className="text-sm text-slate-400">Dining vs budget</p>
        <p className="mt-2 font-display text-5xl">84%</p>
        <div className="mt-4 h-2 rounded-full bg-white/10">
          <div className="h-full w-[84%] rounded-full bg-gold" />
        </div>
      </article>
      <article className="glass rounded-3xl p-6 lg:col-span-4">
        <p className="text-sm text-slate-400">Subscriptions</p>
        <p className="mt-2 font-display text-5xl">$48.97</p>
        <p className="mt-3 text-sm text-slate-400">3 active · 1 unused this month</p>
      </article>

      <section className="glass rounded-3xl p-5 lg:col-span-8">
        <h2 className="mb-4 text-lg font-medium">Monthly spend</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SPENDING}>
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
              <Bar dataKey="spend" fill="#5eead4" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="glass rounded-3xl p-6 lg:col-span-4">
        <h2 className="text-lg font-medium">Category notes</h2>
        <ul className="mt-4 space-y-4">
          {CATEGORIES.map((c) => (
            <li key={c.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{c.name}</span>
                <span className="text-slate-400">${c.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(c.value / 1450) * 100}%`, background: c.color }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
