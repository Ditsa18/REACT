import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useExpense } from '../../context/ExpenseContext'

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <strong>{label}</strong>
        <p className="positive">Income: ₹{payload[0]?.value || 0}</p>
        <p className="negative">Expense: ₹{payload[1]?.value || 0}</p>
      </div>
    )
  }
  return null
}

function IncomeExpenseChart() {
  const { transactions } = useExpense()

  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()

  const dailyMap = {}

  transactions.forEach(t => {
    if (!t.id) return
    const date = new Date(t.id)

    if (date.getMonth() !== month || date.getFullYear() !== year) return

    const day = date.getDate()

    if (!dailyMap[day]) {
      dailyMap[day] = { day, income: 0, expense: 0 }
    }

    if (t.amount > 0) dailyMap[day].income += t.amount
    else dailyMap[day].expense += Math.abs(t.amount)
  })

  const data = Object.values(dailyMap).sort((a, b) => a.day - b.day)

  return (
    <div className="card">
      <h4>Income vs Expense — This Month</h4>
      <p className="chart-subtext">Daily comparison</p>

      {data.length === 0 ? (
        <p className="empty-state">No data for this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey="income" fill="#16a34a" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#dc2626" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default IncomeExpenseChart
