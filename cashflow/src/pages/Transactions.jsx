import TransactionForm from '../components/transactions/TransactionForm'
import TransactionList from '../components/transactions/TransactionList'
import { useExpense } from '../context/ExpenseContext'

function Transactions() {
  const { transactions } = useExpense()

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const startOfTomorrow = new Date(startOfToday)
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)

  const todaysTransactions = transactions.filter(t => {
    if (!t.id) return false
    const time = new Date(t.id)
    return time >= startOfToday && time < startOfTomorrow
  })

  return (
    <div className="transactions-page">
      <h2 className="page-title">Transactions</h2>

      <div className="transactions-grid">
        <TransactionForm />
        <TransactionList transactions={todaysTransactions} />
      </div>
    </div>
  )
}

export default Transactions
