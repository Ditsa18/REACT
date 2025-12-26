import CategoryItem from './CategoryItem'

function CategoryList({ categories, onDelete }) {
  return (
    <div className="card">
      <h4>Category List</h4>

      {categories.length === 0 ? (
        <p className="empty-state">No categories added yet.</p>
      ) : (
        <ul className="category-list">
          {categories.map(category => (
            <CategoryItem
              key={category}
              name={category}
              onDelete={() => onDelete(category)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default CategoryList
