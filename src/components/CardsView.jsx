import { motion } from 'framer-motion'
import { Lock, Snowflake, Zap } from 'lucide-react'
import { useFinance } from '../finance'
import AnimatedNumber from './AnimatedNumber'

export default function CardsView({ setPage }) {
  const { cards, activeCard, activeCardId, setActiveCardId, toggleCardFlag, transactions } = useFinance()
  const used = Math.min(100, (activeCard.balance / activeCard.limit) * 100)
  const cardTx = transactions.filter((tx) => tx.cardId === activeCardId).slice(0, 5)

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="grid gap-4 sm:grid-cols-3 lg:col-span-12">
        {cards.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setActiveCardId(item.id)}
            className={`shine relative rounded-3xl bg-gradient-to-br p-5 text-left text-ink shadow-xl transition hover:-translate-y-1 ${item.gradient} ${
              activeCardId === item.id ? 'ring-2 ring-white/70' : 'opacity-90'
            }`}
          >
            {item.frozen && (
              <span className="absolute top-3 right-3 rounded-full bg-black/40 px-2 py-1 text-[10px] tracking-wide text-white uppercase">
                Frozen
              </span>
            )}
            <p className="text-sm opacity-80">{item.name}</p>
            <p className="mt-10 font-mono tracking-[0.3em]">•••• {item.last4}</p>
            <div className="mt-8 flex justify-between text-xs">
              <span>{item.holder}</span>
              <span>${item.balance.toFixed(0)}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <section className="glass rounded-3xl p-6 lg:col-span-8">
        <h2 className="text-lg font-medium">{activeCard.name}</h2>
        <p className="mt-6 text-sm text-slate-400">Available to spend</p>
        <p className="font-display text-5xl">
          <AnimatedNumber value={activeCard.balance} prefix="$" decimals={2} />
        </p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            key={`${activeCard.id}-${activeCard.balance}`}
            initial={{ width: 0 }}
            animate={{ width: `${used}%` }}
            className="h-full rounded-full bg-mint"
          />
        </div>
        <p className="mt-2 text-sm text-slate-400">
          {used.toFixed(0)}% of ${activeCard.limit.toLocaleString()} limit remaining
        </p>
        {activeCard.onlineLocked && (
          <p className="mt-3 text-sm text-gold">Online payments are locked on this card.</p>
        )}
        {activeCard.rewardsBoost && (
          <p className="mt-2 text-sm text-mint">Rewards boosted to 2.4% on travel.</p>
        )}
      </section>

      <section className="grid gap-3 lg:col-span-4">
        {[
          {
            icon: Snowflake,
            title: activeCard.frozen ? 'Unfreeze card' : 'Freeze card',
            copy: activeCard.frozen ? 'Spending is blocked until you unfreeze.' : 'Pause spend instantly.',
            flag: 'frozen',
            on: activeCard.frozen,
          },
          {
            icon: Lock,
            title: activeCard.onlineLocked ? 'Unlock online' : 'Lock online',
            copy: activeCard.onlineLocked ? 'Web and app payments are blocked.' : 'Block web purchases.',
            flag: 'onlineLocked',
            on: activeCard.onlineLocked,
          },
          {
            icon: Zap,
            title: activeCard.rewardsBoost ? 'Boost on' : 'Boost rewards',
            copy: activeCard.rewardsBoost ? '2.4% travel rewards active.' : 'Turn on 2.4% travel rewards.',
            flag: 'rewardsBoost',
            on: activeCard.rewardsBoost,
          },
        ].map((action) => (
          <button
            key={action.flag}
            type="button"
            onClick={() => toggleCardFlag(activeCard.id, action.flag)}
            className={`glass shine flex items-center gap-4 rounded-3xl p-5 text-left transition ${
              action.on ? 'border-mint/50 bg-mint/10' : 'hover:border-mint/40'
            }`}
          >
            <action.icon className="text-mint" size={20} />
            <span>
              <span className="block font-medium">{action.title}</span>
              <span className="text-sm text-slate-400">{action.copy}</span>
            </span>
          </button>
        ))}
      </section>

      <section className="glass rounded-3xl p-6 lg:col-span-12">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium">Recent charges on this card</h3>
          <button type="button" className="text-sm text-mint" onClick={() => setPage('transactions')}>
            Full history
          </button>
        </div>
        {cardTx.length === 0 && <p className="text-sm text-slate-400">No activity on this card yet.</p>}
        <ul className="divide-y divide-white/5">
          {cardTx.map((tx) => (
            <li key={tx.id} className="flex items-center justify-between py-3 text-sm">
              <span>
                <span className="block font-medium">{tx.merchant}</span>
                <span className="text-xs text-slate-400">
                  {tx.date} · {tx.status}
                </span>
              </span>
              <span className={tx.amount > 0 ? 'text-mint' : ''}>
                {tx.amount > 0 ? '+' : ''}
                {tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
