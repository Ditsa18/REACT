import { useState } from 'react'
import { useExpense } from '../context/ExpenseContext'

function History() {
  const [view, setView] = useState('daily')
  const [selected, setSelected] = useState(null)
  const [quickFilter, setQuickFilter] = useState(null)

  const { transactions } = useExpense()

  /* ---------- DAILY ---------- */
  const dailyMap = {}

  transactions.forEach(t => {
    if (!t.id) return

    const date = new Date(t.id)
    const key = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

    if (!dailyMap[key]) {
      dailyMap[key] = {
        income: 0,
        expense: 0,
        items: [],
      }
    }

    if (t.amount > 0) dailyMap[key].income += t.amount
    else dailyMap[key].expense += Math.abs(t.amount)

    dailyMap[key].items.push(t)
  })

  let dailyData = Object.entries(dailyMap).sort(
    (a, b) => new Date(b[0]) - new Date(a[0])
  )

  /* ---------- MONTHLY ---------- */
  const monthlyMap = {}

  transactions.forEach(t => {
    if (!t.id) return

    const date = new Date(t.id)
    const key = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })

    if (!monthlyMap[key]) {
      monthlyMap[key] = { income: 0, expense: 0 }
    }

    if (t.amount > 0) monthlyMap[key].income += t.amount
    else monthlyMap[key].expense += Math.abs(t.amount)
  })

  let monthlyData = Object.entries(monthlyMap)

  /* ---------- YEARLY ---------- */
  const yearlyMap = {}

  transactions.forEach(t => {
    if (!t.id) return

    const year = new Date(t.id).getFullYear()

    if (!yearlyMap[year]) {
      yearlyMap[year] = { income: 0, expense: 0 }
    }

    if (t.amount > 0) yearlyMap[year].income += t.amount
    else yearlyMap[year].expense += Math.abs(t.amount)
  })

  let yearlyData = Object.entries(yearlyMap).sort(
    (a, b) => b[0] - a[0]
  )

  /* ---------- QUICK FILTER ---------- */
  if (view === 'monthly' && quickFilter) {
    monthlyData = monthlyData.filter(([label]) =>
      label.includes(quickFilter)
    )
  }

  if (view === 'yearly' && quickFilter) {
    yearlyData = yearlyData.filter(([year]) =>
      String(year) === quickFilter
    )
  }

  /* ---------- ROW RENDER ---------- */
  const renderRows = data =>
    data.length === 0 ? (
      <p className="empty-state">No data available.</p>
    ) : (
      data.map(([label, values]) => {
        const net = values.income - values.expense

        return (
          <div
            key={label}
            className="history-row clickable"
            onClick={() =>
              setSelected({ label, values, type: view })
            }
          >
            <span className="history-date">{label}</span>
            <span className="positive">₹{values.income}</span>
            <span className="negative">₹{values.expense}</span>
            <span className={net >= 0 ? 'positive' : 'negative'}>
              ₹{Math.abs(net)}
            </span>
          </div>
        )
      })
    )

  /* ---------- QUICK NAV DATA ---------- */
  const months = [...new Set(monthlyData.map(([m]) => m))]
  const years = [...new Set(yearlyData.map(([y]) => String(y)))]

  return (
    <div className="history-page">
      {/* HEADER */}
      <div className="history-header">
        <h2 className="page-title">History</h2>

        <div className="history-toggle">
          {['daily', 'monthly', 'yearly'].map(v => (
            <button
              key={v}
              className={view === v ? 'active' : ''}
              onClick={() => {
                setView(v)
                setQuickFilter(null)
              }}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* QUICK NAV */}
      {(view === 'monthly' || view === 'yearly') && (
        <div className="history-quick">
          {(view === 'monthly' ? months : years).map(val => (
            <button
              key={val}
              className={quickFilter === val ? 'active' : ''}
              onClick={() => setQuickFilter(val)}
            >
              {val}
            </button>
          ))}
        </div>
      )}

      {/* TABLE */}
      <div className="history-table card">
        <div className="history-head">
          <span>Date</span>
          <span>Income</span>
          <span>Expense</span>
          <span>Net</span>
        </div>

        <div className="history-body">
          {view === 'daily' && renderRows(dailyData)}
          {view === 'monthly' && renderRows(monthlyData)}
          {view === 'yearly' && renderRows(yearlyData)}
        </div>
      </div>

      {/* ---------- MODAL ---------- */}
      {selected && (
        <div
          className="overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="overlay-card"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="overlay-close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <h3>{selected.label}</h3>

            <div className="overlay-stats">
              <div>
                <span>Income</span>
                <strong className="positive">
                  ₹{selected.values.income}
                </strong>
              </div>
              <div>
                <span>Expense</span>
                <strong className="negative">
                  ₹{selected.values.expense}
                </strong>
              </div>
              <div>
                <span>Net</span>
                <strong
                  className={
                    selected.values.income -
                      selected.values.expense >= 0
                      ? 'positive'
                      : 'negative'
                  }
                >
                  ₹
                  {Math.abs(
                    selected.values.income -
                      selected.values.expense
                  )}
                </strong>
              </div>
            </div>

            {/* DAILY TRANSACTIONS */}
            {selected.type === 'daily' && (
              <ul className="modal-list">
                {selected.values.items.map(t => (
                  <li key={t.id}>
                    <span>{t.text}</span>
                    <span
                      className={
                        t.amount >= 0 ? 'positive' : 'negative'
                      }
                    >
                      {t.amount >= 0 ? '+' : '-'}₹
                      {Math.abs(t.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default History
