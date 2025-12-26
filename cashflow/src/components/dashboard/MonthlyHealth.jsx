import { useExpense } from '../../context/ExpenseContext'

function MonthlyHealth() {
  const { transactions, monthlyBudget } = useExpense()

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  let expense = 0

  transactions.forEach(t => {
    if (!t.id || t.amount >= 0) return

    const date = new Date(t.id)

    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      expense += Math.abs(t.amount)
    }
  })

  const percentUsed =
    monthlyBudget > 0
      ? Math.min(
          Math.round((expense / monthlyBudget) * 100),
          100
        )
      : 0

  const remaining = monthlyBudget - expense

  return (
    <div className="card monthly-health">
      <h4>This Month</h4>

      <div className="budget-bar">
        <div
          className="budget-fill"
          style={{ width: `${percentUsed}%` }}
        />
      </div>

      <div className="budget-info">
        <span>
          ₹{expense} spent of ₹{monthlyBudget}
        </span>

        <span
          className={remaining >= 0 ? 'positive' : 'negative'}
        >
          {remaining >= 0
            ? `₹${remaining} left`
            : `₹${Math.abs(remaining)} over`}
        </span>
      </div>
    </div>
  )
}

export default MonthlyHealth
