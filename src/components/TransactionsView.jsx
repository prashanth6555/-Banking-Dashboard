import { useMemo, useState } from 'react'
import { useFinance } from '../finance'

export default function TransactionsView({ query, setQuery }) {
  const { transactions, cards } = useFinance()
  const [filter, setFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(null)
  const cats = ['All', ...new Set(transactions.map((t) => t.category))]

  const rows = useMemo(() => {
    return transactions.filter((t) => {
      const q = (query || '').trim().toLowerCase()
      const matchesQuery =
        !q ||
        t.merchant.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
      const matchesCat = filter === 'All' || t.category === filter
      return matchesQuery && matchesCat
    })
  }, [filter, query, transactions])

  const selected = transactions.find((tx) => tx.id === selectedId) || rows[0]

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <section className="glass rounded-3xl p-4 sm:p-6 lg:col-span-8">
        <div className="mb-5 flex flex-wrap gap-2">
          {cats.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                filter === cat ? 'bg-mint text-ink' : 'border border-line text-slate-300 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="pb-3 font-medium">Merchant</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">When</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((tx) => (
                <tr
                  key={tx.id}
                  className={`cursor-pointer border-t border-line/80 hover:bg-white/4 ${
                    (selected?.id === tx.id) ? 'bg-mint/10' : ''
                  }`}
                  onClick={() => setSelectedId(tx.id)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedId(tx.id)}
                  tabIndex={0}
                >
                  <td className="py-4 font-medium">{tx.merchant}</td>
                  <td className="py-4 text-slate-400">{tx.category}</td>
                  <td className="py-4 text-slate-400">{tx.date}</td>
                  <td className="py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        tx.status === 'Pending' ? 'bg-gold/15 text-gold' : 'bg-mint/15 text-mint'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className={`py-4 text-right font-medium ${tx.amount > 0 ? 'text-mint' : ''}`}>
                    {tx.amount > 0 ? '+' : ''}
                    {tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-300">No matching activity.</p>
              <button
                type="button"
                className="mt-3 text-sm text-mint"
                onClick={() => {
                  setFilter('All')
                  setQuery?.('')
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <aside className="glass rounded-3xl p-6 lg:col-span-4">
        <h2 className="text-lg font-medium">Transaction detail</h2>
        {!selected && <p className="mt-3 text-sm text-slate-400">Select a row to inspect it.</p>}
        {selected && (
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Merchant</dt>
              <dd className="font-medium">{selected.merchant}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Amount</dt>
              <dd className={selected.amount > 0 ? 'text-mint' : ''}>
                {selected.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">Category</dt>
              <dd>{selected.category}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Status</dt>
              <dd>{selected.status}</dd>
            </div>
            <div>
              <dt className="text-slate-400">When</dt>
              <dd>{selected.date}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Card</dt>
              <dd>{cards.find((card) => card.id === selected.cardId)?.name || 'Primary'}</dd>
            </div>
          </dl>
        )}
      </aside>
    </div>
  )
}
