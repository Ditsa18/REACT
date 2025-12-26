import TransactionItem from './TransactionItem'

function TransactionList({ transactions }) {
  return (
    <div className="card txn-card">
      <h4>Today's Transactions</h4>

      {transactions.length === 0 ? (
        <p className="empty-state">No transactions added today.</p>
      ) : (
        <ul className="txn-list">
          {transactions.map(t => (
            <TransactionItem key={t.id} transaction={t} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TransactionList
