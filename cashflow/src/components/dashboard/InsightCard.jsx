import { useExpense } from '../../context/ExpenseContext'

function InsightCard() {
  const { transactions } = useExpense()

  const now = new Date()
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const yesterdayStart = new Date(todayStart)
  yesterdayStart.setDate(yesterdayStart.getDate() - 1)

  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  let todayExpense = 0
  let yesterdayExpense = 0
  const categoryMap = {}

  transactions.forEach(t => {
    if (!t.id || t.amount >= 0) return

    const date = new Date(t.id)

    // Today
    if (date >= todayStart) {
      todayExpense += Math.abs(t.amount)
    }

    // Yesterday
    if (date >= yesterdayStart && date < todayStart) {
      yesterdayExpense += Math.abs(t.amount)
    }

    // Monthly category tracking
    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + Math.abs(t.amount)
    }
  })

  let insight = 'No spending data available yet.'

  // Insight logic priority
  if (todayExpense === 0) {
    insight = 'No spending recorded today — good discipline 👏'
  } else if (todayExpense > yesterdayExpense) {
    insight = `You spent ₹${todayExpense - yesterdayExpense} more than yesterday.`
  } else if (todayExpense < yesterdayExpense) {
    insight = `Nice! You spent ₹${yesterdayExpense - todayExpense} less than yesterday 🎉`
  }

  // Monthly category insight (overrides if meaningful)
  const topCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0]

  if (topCategory && topCategory[1] > todayExpense) {
    insight = `${topCategory[0]} is your highest expense category this month.`
  }

  return (
    <div className="card insight-card">
      <h4>Insight</h4>
      <p>{insight}</p>
    </div>
  )
}

export default InsightCard
