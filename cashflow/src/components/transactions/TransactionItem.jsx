import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useExpense } from '../../context/ExpenseContext'
import { CATEGORY_META } from '../../utils/constants'

function TransactionItem({ transaction }) {
  const { deleteTransaction } = useExpense()
  const isExpense = transaction.amount < 0

  const meta = CATEGORY_META[transaction.category] || {}
  const color = meta.color || '#64748b'
  const icon = meta.icon || 'tag'

  return (
    <li className={`txn-item ${isExpense ? 'txn-expense' : 'txn-income'}`}>
      <div className="txn-left">
        <span className="txn-icon" style={{ backgroundColor: color }}>
          <FontAwesomeIcon icon={icon} />
        </span>

        <div className="txn-text">
          <span className="txn-description">{transaction.text}</span>
          <span className="txn-category">{transaction.category}</span>
        </div>
      </div>

      <div className="txn-right">
        <span className="txn-amount">₹{Math.abs(transaction.amount)}</span>
        <button onClick={() => deleteTransaction(transaction.id)}>
          <FontAwesomeIcon icon="trash" />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
