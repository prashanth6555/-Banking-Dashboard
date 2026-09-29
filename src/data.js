export const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'cards', label: 'Cards' },
  { id: 'payments', label: 'Payments' },
  { id: 'transactions', label: 'Activity' },
  { id: 'insights', label: 'Insights' },
]

export const STATS = [
  { key: 'income', label: 'Monthly income', value: 8420, delta: 12.4, prefix: '$' },
  { key: 'spend', label: 'This month spent', value: 3186, delta: -6.1, prefix: '$' },
  { key: 'savings', label: 'Savings rate', value: 28.4, delta: 3.2, suffix: '%' },
  { key: 'score', label: 'Credit health', value: 782, delta: 8, suffix: '' },
]

export const CARDS = [
  {
    id: 'platinum',
    name: 'National Platinum',
    last4: '4821',
    holder: 'Aria Bennett',
    expiry: '09/28',
    balance: 12480.42,
    limit: 25000,
    gradient: 'from-[#123447] via-[#0e7490] to-[#5eead4]',
  },
  {
    id: 'reserve',
    name: 'Noir Reserve',
    last4: '9033',
    holder: 'Aria Bennett',
    expiry: '04/27',
    balance: 2190.18,
    limit: 12000,
    gradient: 'from-[#1a140c] via-[#7c5a1e] to-[#f5d38a]',
  },
  {
    id: 'travel',
    name: 'Horizon Travel',
    last4: '1176',
    holder: 'Aria Bennett',
    expiry: '11/29',
    balance: 640.5,
    limit: 8000,
    gradient: 'from-[#102033] via-[#1d4ed8] to-[#7dd3fc]',
  },
]

export const TRANSACTIONS = [
  { id: 1, merchant: 'Nordstrom', category: 'Shopping', amount: -186.4, date: 'Today, 10:24', status: 'Posted', cardId: 'platinum' },
  { id: 2, merchant: 'Payroll — Lumen Studio', category: 'Income', amount: 4210, date: 'Today, 08:01', status: 'Posted', cardId: 'platinum' },
  { id: 3, merchant: 'Blue Bottle Coffee', category: 'Dining', amount: -7.85, date: 'Yesterday', status: 'Posted', cardId: 'reserve' },
  { id: 4, merchant: 'PG&E Energy', category: 'Bills', amount: -124.2, date: 'Sep 26', status: 'Posted', cardId: 'platinum' },
  { id: 5, merchant: 'Uber Trip', category: 'Transit', amount: -18.6, date: 'Sep 26', status: 'Pending', cardId: 'travel' },
  { id: 6, merchant: 'Apple', category: 'Tech', amount: -9.99, date: 'Sep 25', status: 'Posted', cardId: 'reserve' },
  { id: 7, merchant: 'Whole Foods', category: 'Groceries', amount: -64.12, date: 'Sep 24', status: 'Posted', cardId: 'platinum' },
  { id: 8, merchant: 'Transfer from Savings', category: 'Transfer', amount: 500, date: 'Sep 23', status: 'Posted', cardId: 'platinum' },
  { id: 9, merchant: 'Spotify Family', category: 'Subscriptions', amount: -16.99, date: 'Sep 22', status: 'Posted', cardId: 'travel' },
  { id: 10, merchant: 'Coastal Dental', category: 'Health', amount: -85, date: 'Sep 21', status: 'Posted', cardId: 'reserve' },
]

export const SPENDING = [
  { month: 'Apr', spend: 2480, income: 7800 },
  { month: 'May', spend: 2710, income: 7800 },
  { month: 'Jun', spend: 2390, income: 8100 },
  { month: 'Jul', spend: 3120, income: 8100 },
  { month: 'Aug', spend: 2890, income: 8420 },
  { month: 'Sep', spend: 3186, income: 8420 },
]

export const CATEGORIES = [
  { name: 'Housing', value: 1450, color: '#5eead4' },
  { name: 'Dining', value: 420, color: '#f5d38a' },
  { name: 'Shopping', value: 510, color: '#7dd3fc' },
  { name: 'Transit', value: 186, color: '#a78bfa' },
  { name: 'Other', value: 620, color: '#94a3b8' },
]

export const CONTACTS = [
  { name: 'Maya Chen', initials: 'MC' },
  { name: 'Leo Park', initials: 'LP' },
  { name: 'Sofia Ruiz', initials: 'SR' },
  { name: 'Noah Adeyemi', initials: 'NA' },
]
