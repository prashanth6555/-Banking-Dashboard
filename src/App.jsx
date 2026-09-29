import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import CardsView from './components/CardsView'
import Header from './components/Header'
import InsightsView from './components/InsightsView'
import Overview from './components/Overview'
import PaymentsView from './components/PaymentsView'
import Sidebar from './components/Sidebar'
import TransactionsView from './components/TransactionsView'
import { FinanceProvider } from './finance'

const views = {
  overview: Overview,
  cards: CardsView,
  payments: PaymentsView,
  transactions: TransactionsView,
  insights: InsightsView,
}

function Dashboard() {
  const [page, setPage] = useState('overview')
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [query, setQuery] = useState('')
  const View = views[page]

  return (
    <div className="mesh min-h-svh w-full">
      <Sidebar
        page={page}
        setPage={setPage}
        open={open}
        setOpen={setOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div
        className={`min-h-svh w-full transition-[padding] duration-300 ${
          collapsed ? 'lg:pl-[88px]' : 'lg:pl-[260px]'
        }`}
      >
        <Header page={page} setOpen={setOpen} query={query} setQuery={setQuery} />
        <main className="w-full px-3 py-5 sm:px-5 lg:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <View setPage={setPage} query={query} setQuery={setQuery} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <FinanceProvider>
      <Dashboard />
    </FinanceProvider>
  )
}
