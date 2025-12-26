import CategoryForm from '../components/categories/CategoryForm'
import CategoryList from '../components/categories/CategoryList'
import { useExpense } from '../context/ExpenseContext'

function Categories() {
  const { categories, addCategory, deleteCategory } = useExpense()

  return (
    <div className="categories-page">
      <h2 className="page-title">Categories</h2>

      <div className="categories-grid">
        <CategoryForm onAdd={addCategory} />
        <CategoryList
          categories={categories}
          onDelete={deleteCategory}
        />
      </div>
    </div>
  )
}

export default Categories
