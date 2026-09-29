import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useFinance } from '../finance'

const MODES = [
  { id: 'send', label: 'Send' },
  { id: 'request', label: 'Request' },
  { id: 'topup', label: 'Top up' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'international', label: 'International' },
  { id: 'scan', label: 'Scan' },
]

const COPY = {
  send: 'Send money from the selected card.',
  request: 'Ask a contact to pay you. This lands as pending activity.',
  topup: 'Add funds to the selected card.',
  schedule: 'Queue a transfer. It stays pending until the date.',
  international: 'Send FX from the selected card.',
  scan: 'Pay a scanned QR merchant from this card.',
}

export default function PaymentsView() {
  const {
    contacts,
    cards,
    activeCard,
    activeCardId,
    setActiveCardId,
    recipient,
    setRecipient,
    paymentMode,
    setPaymentMode,
    submitPayment,
  } = useFinance()
  const [amount, setAmount] = useState('250')
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    setFeedback(null)
  }, [paymentMode, recipient, activeCardId])

  const needsContact = paymentMode !== 'topup' && paymentMode !== 'scan'
  const actionLabel = {
    send: `Pay ${recipient.split(' ')[0]}`,
    request: `Request ${recipient.split(' ')[0]}`,
    topup: 'Add funds',
    schedule: `Schedule ${recipient.split(' ')[0]}`,
    international: `Send FX to ${recipient.split(' ')[0]}`,
    scan: 'Pay QR merchant',
  }[paymentMode]

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <section className="glass rounded-3xl p-6 lg:col-span-7">
        <h2 className="text-lg font-medium">Payments</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setPaymentMode(mode.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                paymentMode === mode.id ? 'bg-mint text-ink' : 'border border-line text-slate-300'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-400">{COPY[paymentMode]}</p>

        <p className="mt-6 text-sm text-slate-400">Pay from</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveCardId(card.id)}
              className={`rounded-2xl border px-3 py-3 text-left text-sm ${
                activeCardId === card.id ? 'border-mint bg-mint/10' : 'border-line'
              }`}
            >
              <span className="block font-medium">{card.name}</span>
              <span className="text-slate-400">${card.balance.toFixed(2)}</span>
              {card.frozen && <span className="mt-1 block text-xs text-rose-300">Frozen</span>}
            </button>
          ))}
        </div>

        {needsContact && (
          <>
            <p className="mt-6 text-sm text-slate-400">Contact</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {contacts.map((contact) => (
                <button
                  key={contact.name}
                  type="button"
                  onClick={() => setRecipient(contact.name)}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    recipient === contact.name ? 'border-mint bg-mint/10' : 'border-line hover:border-white/20'
                  }`}
                >
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-slate-400">Instant · {contact.initials}</p>
                </button>
              ))}
            </div>
          </>
        )}

        <label className="mt-6 block text-sm text-slate-400">Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))}
          className="mt-2 w-full rounded-2xl border border-line bg-white/4 px-4 py-4 font-display text-4xl outline-none focus:border-mint"
        />
        <p className="mt-2 text-xs text-slate-500">
          {activeCard.name} available: ${activeCard.balance.toFixed(2)}
        </p>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const result = submitPayment({
              amount,
              to: paymentMode === 'scan' ? 'QR merchant' : recipient,
              mode: paymentMode,
            })
            setFeedback(result)
            if (result.ok) setAmount('')
          }}
          className="mt-6 w-full rounded-2xl bg-mint py-4 font-semibold text-ink shadow-[0_12px_40px_rgba(94,234,212,0.28)]"
        >
          {actionLabel} ${amount || '0'}
        </motion.button>

        {feedback && (
          <p className={`mt-4 text-center ${feedback.ok ? 'text-mint' : 'text-rose-300'}`}>
            {feedback.ok ? feedback.message : feedback.error}
          </p>
        )}
      </section>

      <section className="space-y-4 lg:col-span-5">
        {MODES.filter((mode) => mode.id !== 'send').map((mode, i) => (
          <motion.article
            key={mode.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-3xl p-6"
          >
            <h3 className="font-medium">{mode.label}</h3>
            <p className="mt-2 text-sm text-slate-400">{COPY[mode.id]}</p>
            <button
              type="button"
              className="mt-4 text-sm text-mint"
              onClick={() => setPaymentMode(mode.id)}
            >
              Use this →
            </button>
          </motion.article>
        ))}
      </section>
    </div>
  )
}
