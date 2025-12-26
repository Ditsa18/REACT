import { useExpense } from '../../context/ExpenseContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SummaryCards() {
  const { transactions } = useExpense()

  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((a, t) => a + t.amount, 0)

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((a, t) => a + Math.abs(t.amount), 0)

  const balance = income - expense

  return (
    <div className="summary-grid triple">
      {/* Income */}
      <div className="card summary income">
        <p>
          <FontAwesomeIcon icon="arrow-up" /> Income
        </p>
        <h3>₹{income.toFixed(2)}</h3>
      </div>

      {/* Expense */}
      <div className="card summary expense">
        <p>
          <FontAwesomeIcon icon="arrow-down" /> Expense
        </p>
        <h3>₹{expense.toFixed(2)}</h3>
      </div>

      {/* Balance */}
      <div className="card summary balance">
        <p>
          <FontAwesomeIcon icon="wallet" /> Balance
        </p>
        <h3
          className={
            balance >= 0 ? 'positive' : 'negative'
          }
        >
          ₹{balance.toFixed(2)}
        </h3>
      </div>
    </div>
  )
}

export default SummaryCards
