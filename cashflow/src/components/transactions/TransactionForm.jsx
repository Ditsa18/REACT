import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useExpense } from '../../context/ExpenseContext'

function TransactionForm() {
  const { addTransaction, categories } = useExpense()

  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('expense') // 👈 NEW

  function handleSubmit(e) {
    e.preventDefault()
    if (!text || !amount || !category) return

    const finalAmount =
      type === 'expense'
        ? -Math.abs(Number(amount))
        : Math.abs(Number(amount))

    addTransaction({
      id: Date.now(),
      text,
      amount: finalAmount,
      category,
    })

    setText('')
    setAmount('')
    setCategory('')
    setType('expense')
  }

  return (
    <div className="card">
      <h4>Add Transaction</h4>

      <form onSubmit={handleSubmit} className="transaction-form">

        {/* 🔄 Income / Expense Toggle */}
        <div className="txn-type-toggle">
          <button
            type="button"
            className={type === 'expense' ? 'active expense' : ''}
            onClick={() => setType('expense')}
          >
            Expense
          </button>

          <button
            type="button"
            className={type === 'income' ? 'active income' : ''}
            onClick={() => setType('income')}
          >
            Income
          </button>
        </div>

        <input
          type="text"
          placeholder="Description"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <input
          type="number"
          inputMode="numeric"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categories.map(cat => (
  <option key={cat} value={cat}>
    {cat}
  </option>
))}

        </select>

        <button type="submit">
          <FontAwesomeIcon icon="plus" /> Add
        </button>
      </form>
    </div>
  )
}

export default TransactionForm