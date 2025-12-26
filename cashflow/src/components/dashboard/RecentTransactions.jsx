import { useExpense } from '../../context/ExpenseContext'

function RecentTransactions() {
  const { transactions } = useExpense()
  const recent = transactions.slice(0, 5)

  return (
    <div className="card">
      <h4>Recent Transactions</h4>

      {recent.length === 0 && <p>No transactions yet</p>}

      <ul className="recent-list">
        {recent.map(t => (
          <li key={t.id} className={t.amount < 0 ? 'expense' : 'income'}>
            <span>{t.text}</span>
            <span>₹{Math.abs(t.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentTransactions
