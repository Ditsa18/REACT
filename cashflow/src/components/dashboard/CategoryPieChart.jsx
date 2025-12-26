import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useExpense } from '../../context/ExpenseContext'
import { CATEGORY_META } from '../../utils/constants'

function CategoryPieChart() {
  const { transactions } = useExpense()

  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()

  const expenseMap = {}

  transactions.forEach(t => {
    if (t.amount >= 0 || !t.id) return

    const date = new Date(t.id)
    if (date.getMonth() !== month || date.getFullYear() !== year) return

    expenseMap[t.category] =
      (expenseMap[t.category] || 0) + Math.abs(t.amount)
  })

  const data = Object.entries(expenseMap).map(([cat, value]) => ({
    name: cat,
    value,
    color: CATEGORY_META[cat]?.color || '#64748b',
  }))

  return (
    <div className="card">
      <h4>Expense Breakdown — This Month</h4>

      {data.length === 0 ? (
        <p className="empty-state">No expense data available.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip formatter={v => `₹${v}`} />
            </PieChart>
          </ResponsiveContainer>

          <div className="category-legend">
            {data.map(item => (
              <div key={item.name} className="legend-item">
                <span
                  className="legend-color"
                  style={{ background: item.color }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CategoryPieChart
