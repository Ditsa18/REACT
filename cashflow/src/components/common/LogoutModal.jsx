function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className="modal-backdrop">
      <div className="logout-modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h3>Log out of CashFlow?</h3>
        <p>
          You’ll be signed out of your account.
          You can log back in anytime.
        </p>

        <div className="logout-actions">
          <button
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn-danger"
            onClick={onConfirm}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
