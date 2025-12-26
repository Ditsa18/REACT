import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../context/ThemeContext'
import { useExpense } from '../context/ExpenseContext'
import { useState, useEffect } from 'react'

function Settings() {
  const { theme, toggleTheme } = useTheme()
  const {
    transactions,
    deleteTransaction,
    categories,
    addCategory,
    monthlyBudget,
    setMonthlyBudget,
  } = useExpense()

  /* ---------- NOTIFICATIONS ---------- */
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("cashflow-notifications")) ?? false
  )

  useEffect(() => {
    localStorage.setItem("cashflow-notifications", JSON.stringify(notifications))
  }, [notifications])

  function toggleNotifications() {
    setNotifications(prev => !prev)
  }

  /* ---------- CLEAR DATA ---------- */
  function clearTransactions() {
    if (!transactions.length) return
    if (window.confirm('Delete all transactions?')) {
      transactions.forEach(t => deleteTransaction(t.id))
    }
  }

  function resetCategories() {
    if (window.confirm('Reset categories to default?')) {
      localStorage.removeItem('cashflow-categories')
      window.location.reload()
    }
  }

  function handleBudgetChange(e) {
    const value = Number(e.target.value)
    if (value >= 0) setMonthlyBudget(value)
  }

  return (
    <div className="settings-page">
      <h2 className="page-title">Settings</h2>

      {/* Appearance */}
      <div className="card settings-card">
        <h4>Appearance</h4>
        <div className="settings-row">
          <span>Theme</span>
          <button onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme === 'light' ? 'moon' : 'sun'} />{' '}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>

      {/* Notifications */}
<div className="card settings-card">
  <h4>Notifications</h4>
  <p className="settings-text">
    Turn on alerts about budget warnings and monthly summary.
  </p>

  <div className="settings-row">
    <span>Enable Notifications</span>

    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={notifications}
        onChange={toggleNotifications}
      />
      <span className="toggle-slider" />
    </label>
  </div>
</div>

      {/* Budget */}
      <div className="card settings-card">
        <h4>Monthly Budget</h4>
        <p className="settings-text">
          Set your spending limit. Used to calculate budget health.
        </p>

        <div className="budget-input">
          <span>₹</span>
          <input
            type="number"
            min="0"
            value={monthlyBudget}
            onChange={handleBudgetChange}
          />
        </div>
      </div>

      {/* Data */}
      <div className="card settings-card">
        <h4>Data Management</h4>

        <div className="settings-row danger">
          <span>Clear all transactions</span>
          <button onClick={clearTransactions}>
            <FontAwesomeIcon icon="trash" /> Clear
          </button>
        </div>

        <div className="settings-row danger">
          <span>Reset categories</span>
          <button onClick={resetCategories}>
            <FontAwesomeIcon icon="rotate-left" /> Reset
          </button>
        </div>
      </div>

      {/* About */}
      <div className="card settings-card">
        <h4>About CashFlow</h4>
        <p className="settings-text">
          CashFlow is a personal finance dashboard helping you track expenses, 
          income, savings & spending trends — built with React.
        </p>
      </div>
    </div>
  )
}

export default Settings
