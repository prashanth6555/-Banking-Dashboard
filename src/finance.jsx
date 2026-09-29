import { createContext, useContext, useState } from 'react'
import { CARDS as SEED_CARDS, CONTACTS, TRANSACTIONS as SEED_TX } from './data'

const FinanceContext = createContext(null)

function money(n) {
  return Math.round(n * 100) / 100
}

export function FinanceProvider({ children }) {
  const [cards, setCards] = useState(() =>
    SEED_CARDS.map((card) => ({
      ...card,
      frozen: false,
      onlineLocked: false,
      rewardsBoost: false,
    })),
  )
  const [transactions, setTransactions] = useState(() =>
    SEED_TX.map((tx) => ({ ...tx, cardId: tx.cardId || 'platinum' })),
  )
  const [activeCardId, setActiveCardId] = useState(SEED_CARDS[0].id)
  const [recipient, setRecipient] = useState(CONTACTS[0].name)
  const [paymentMode, setPaymentMode] = useState('send')
  const [notices, setNotices] = useState([
    { id: 1, text: 'Payroll posted from Lumen Studio', time: 'Today, 08:01' },
    { id: 2, text: 'Uber Trip is pending', time: 'Sep 26' },
  ])
  const [unread, setUnread] = useState(2)

  const activeCard = cards.find((c) => c.id === activeCardId) || cards[0]
  const totalAvailable = cards.reduce((sum, card) => sum + card.balance, 0)

  const notify = (text) => {
    setNotices((list) => [{ id: Date.now(), text, time: 'Just now' }, ...list].slice(0, 10))
    setUnread((count) => count + 1)
  }

  const prependTx = (tx) => {
    setTransactions((list) => [
      {
        id: Date.now(),
        date: 'Just now',
        status: 'Posted',
        cardId: activeCardId,
        ...tx,
      },
      ...list,
    ])
  }

  const submitPayment = ({ amount, to, mode }) => {
    const value = Number(amount)
    if (!Number.isFinite(value) || value <= 0) {
      return { ok: false, error: 'Enter a valid amount greater than 0.' }
    }

    const card = cards.find((item) => item.id === activeCardId)
    if (!card) return { ok: false, error: 'Choose a card first.' }
    if (card.frozen) return { ok: false, error: `${card.name} is frozen. Unfreeze it to continue.` }

    if (mode === 'request') {
      prependTx({
        merchant: `Request · ${to}`,
        category: 'Transfer',
        amount: value,
        status: 'Pending',
      })
      notify(`Requested $${value.toFixed(2)} from ${to}`)
      return { ok: true, message: `Request sent to ${to}.` }
    }

    if (mode === 'topup') {
      setCards((list) =>
        list.map((item) =>
          item.id === card.id ? { ...item, balance: money(item.balance + value) } : item,
        ),
      )
      prependTx({
        merchant: `Top up · ${card.name}`,
        category: 'Transfer',
        amount: value,
      })
      notify(`$${value.toFixed(2)} added to ${card.name}`)
      return { ok: true, message: `$${value.toFixed(2)} added to ${card.name}.` }
    }

    if (card.onlineLocked && (mode === 'send' || mode === 'scan' || mode === 'international')) {
      return { ok: false, error: 'Online payments are locked on this card.' }
    }

    if (card.balance < value) {
      return { ok: false, error: `Not enough funds. ${card.name} has $${card.balance.toFixed(2)}.` }
    }

    const merchant =
      mode === 'schedule'
        ? `Scheduled · ${to}`
        : mode === 'international'
          ? `International · ${to}`
          : mode === 'scan'
            ? 'QR checkout'
            : to

    setCards((list) =>
      list.map((item) =>
        item.id === card.id ? { ...item, balance: money(item.balance - value) } : item,
      ),
    )
    prependTx({
      merchant,
      category: 'Transfer',
      amount: -value,
      status: mode === 'schedule' ? 'Pending' : 'Posted',
    })
    notify(`$${value.toFixed(2)} ${mode === 'schedule' ? 'scheduled for' : 'sent to'} ${to}`)
    return {
      ok: true,
      message:
        mode === 'schedule'
          ? `Scheduled $${value.toFixed(2)} to ${to}.`
          : `Paid ${to} $${value.toFixed(2)} from ${card.name}.`,
    }
  }

  const toggleCardFlag = (id, flag) => {
    setCards((list) =>
      list.map((card) => (card.id === id ? { ...card, [flag]: !card[flag] } : card)),
    )
    const card = cards.find((item) => item.id === id)
    if (!card) return
    const next = !card[flag]
    if (flag === 'frozen') notify(`${card.name} ${next ? 'frozen' : 'unfrozen'}`)
    if (flag === 'onlineLocked') notify(`${card.name} online payments ${next ? 'locked' : 'unlocked'}`)
    if (flag === 'rewardsBoost') notify(`${card.name} rewards ${next ? 'boosted' : 'back to standard'}`)
  }

  const openPayments = ({ mode = 'send', to } = {}) => {
    setPaymentMode(mode)
    if (to) setRecipient(to)
  }

  const value = {
    cards,
    transactions,
    activeCardId,
    setActiveCardId,
    activeCard,
    totalAvailable,
    recipient,
    setRecipient,
    paymentMode,
    setPaymentMode,
    notices,
    unread,
    clearUnread: () => setUnread(0),
    contacts: CONTACTS,
    submitPayment,
    toggleCardFlag,
    openPayments,
    notify,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const ctx = useContext(FinanceContext)
  if (!ctx) throw new Error('useFinance must be used inside FinanceProvider')
  return ctx
}
