import { useExpense } from '../../context/ExpenseContext'

function TodayPulse() {
  const { transactions } = useExpense()

  // Start of today
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  // Start of tomorrow
  const startOfTomorrow = new Date(startOfToday)
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)

  let income = 0
  let expense = 0

  transactions.forEach(t => {
    if (!t.id) return
    const time = new Date(t.id)

    if (time >= startOfToday && time < startOfTomorrow) {
      if (t.amount > 0) income += t.amount
      else expense += Math.abs(t.amount)
    }
  })

  const net = income - expense

  return (
    <div className="card today-pulse">
      <h4>Today</h4>

      <div className="pulse-row">
        <span>Income</span>
        <span className="positive">₹{income}</span>
      </div>

      <div className="pulse-row">
        <span>Expense</span>
        <span className="negative">₹{expense}</span>
      </div>

      <div className="pulse-row net">
        <span>Net</span>
        <span className={net >= 0 ? 'positive' : 'negative'}>
          {net >= 0 ? '+' : '-'}₹{Math.abs(net)}
        </span>
      </div>
    </div>
  )
}

export default TodayPulse
