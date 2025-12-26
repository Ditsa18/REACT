import { useExpense } from '../../context/ExpenseContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SpendingTrend() {
  const { transactions } = useExpense()

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  let thisMonthExpense = 0
  let lastMonthExpense = 0

  transactions.forEach(t => {
    if (!t.id || t.amount >= 0) return

    const date = new Date(t.id)
    const amount = Math.abs(t.amount)

    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      thisMonthExpense += amount
    }

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const lastMonthYear =
      currentMonth === 0 ? currentYear - 1 : currentYear

    if (
      date.getMonth() === lastMonth &&
      date.getFullYear() === lastMonthYear
    ) {
      lastMonthExpense += amount
    }
  })

  if (lastMonthExpense === 0) {
    return (
      <div className="card spending-trend">
        <h4>Spending Trend</h4>
        <p className="neutral">
          Not enough data to compare yet.
        </p>
      </div>
    )
  }

  const diff = thisMonthExpense - lastMonthExpense
  const percent = Math.round(
    (Math.abs(diff) / lastMonthExpense) * 100
  )

  const isUp = diff > 0

  return (
    <div className="card spending-trend">
      <h4>Spending Trend</h4>

      <p
        className={isUp ? 'negative' : 'positive'}
        style={{ fontSize: '1.1rem', fontWeight: 500 }}
      >
        <FontAwesomeIcon
          icon={isUp ? 'arrow-up' : 'arrow-down'}
        />{' '}
        {percent}% {isUp ? 'more' : 'less'} than last month
      </p>

      <p className="trend-subtext">
        ₹{thisMonthExpense.toFixed(0)} this month vs
        ₹{lastMonthExpense.toFixed(0)} last month
      </p>
    </div>
  )
}

export default SpendingTrend
