import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CategoryForm({ onAdd }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name)
    setName('')
  }

  return (
    <div className="card">
      <h4>Add Category</h4>

      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <button type="submit">
          <FontAwesomeIcon icon="plus" /> Add
        </button>
      </form>
    </div>
  )
}

export default CategoryForm
