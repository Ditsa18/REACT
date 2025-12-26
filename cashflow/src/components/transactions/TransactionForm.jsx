import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useExpense } from '../../context/ExpenseContext'

function TransactionForm() {
  const { addTransaction, categories } = useExpense()

  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!text || !amount || !category) return

    addTransaction({
      id: Date.now(),
      text,
      amount: +amount,
      category,
    })

    setText('')
    setAmount('')
    setCategory('')
  }

  return (
    <div className="card">
      <h4>Add Transaction</h4>

      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="text"
          placeholder="Description"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount (+ income, - expense)"
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
