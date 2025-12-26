import { useExpense } from '../../context/ExpenseContext'

function BalanceCard() {
  const { transactions } = useExpense()
  const total = transactions.reduce((acc, t) => acc + t.amount, 0)

  return (
    <div className="card balance-card">
      <p className="card-label">Total Balance</p>
      <h2 className="balance-amount">₹{total.toFixed(2)}</h2>
    </div>
  )
}

export default BalanceCard
