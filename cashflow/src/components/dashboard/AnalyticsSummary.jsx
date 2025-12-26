import { useExpense } from '../../context/ExpenseContext'

function AnalyticsSummary() {
  const { transactions } = useExpense()

  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((a, t) => a + t.amount, 0)

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((a, t) => a + Math.abs(t.amount), 0)

  const balance = income - expense

  return (
    <div className="analytics-summary">
      <div className="card">
        <p>Total Income</p>
        <h3 className="income">₹{income.toFixed(2)}</h3>
      </div>

      <div className="card">
        <p>Total Expense</p>
        <h3 className="expense">₹{expense.toFixed(2)}</h3>
      </div>

      <div className="card">
        <p>Net Balance</p>
        <h3>₹{balance.toFixed(2)}</h3>
      </div>
    </div>
  )
}

export default AnalyticsSummary
