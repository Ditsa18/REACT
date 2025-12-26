import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CATEGORY_META } from '../../utils/constants'

function CategoryItem({ name, onDelete }) {
  const meta = CATEGORY_META[name] || {}
  const color = meta.color || '#64748b'
  const icon = meta.icon || 'tag'

  return (
    <li className="category-item">
      <div className="category-left">
        <span
          className="category-icon"
          style={{ backgroundColor: color }}
        >
          <FontAwesomeIcon icon={icon} />
        </span>
        <span>{name}</span>
      </div>

      <button onClick={onDelete}>
        <FontAwesomeIcon icon="trash" />
      </button>
    </li>
  )
}

export default CategoryItem
