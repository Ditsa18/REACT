import { useState } from 'react'
import { useExpense } from '../../context/ExpenseContext'

function CategorySpotlight() {
  const { transactions } = useExpense()
  const [activeCategory, setActiveCategory] = useState(null)

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const categoryMap = {}

  transactions.forEach(t => {
    if (!t.id || t.amount >= 0 || !t.category) return

    const date = new Date(t.id)

    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + Math.abs(t.amount)
    }
  })

  const topCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  // Detailed breakdown for active category
  const breakdown = transactions.filter(t => {
    if (!activeCategory || !t.id) return false
    const date = new Date(t.id)
    return (
      t.category === activeCategory &&
      t.amount < 0 &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    )
  })

  return (
    <div className="card category-spotlight">
      <h4>Top Categories</h4>

      {topCategories.length === 0 ? (
        <p className="empty-state">
          No expenses recorded this month.
        </p>
      ) : (
        <ul className="category-list">
          {topCategories.map(([category, amount]) => (
            <li
              key={category}
              className={
                activeCategory === category ? 'active' : ''
              }
              onClick={() =>
                setActiveCategory(
                  activeCategory === category
                    ? null
                    : category
                )
              }
            >
              <span>{category}</span>
              <span>₹{amount}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Drill-down */}
      {activeCategory && (
        <div className="category-breakdown">
          <h5>{activeCategory} breakdown</h5>

          {breakdown.map(item => (
            <div key={item.id} className="breakdown-row">
              <span>{item.text}</span>
              <span>₹{Math.abs(item.amount)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategorySpotlight
