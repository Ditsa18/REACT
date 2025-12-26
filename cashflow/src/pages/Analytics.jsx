import AnalyticsSummary from '../components/dashboard/AnalyticsSummary'
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseChart'
import CategoryPieChart from '../components/dashboard/CategoryPieChart'

function Analytics() {
  return (
    <div className="analytics-page">
      <h2 className="page-title">Analytics</h2>

      <AnalyticsSummary />

      {/* Charts */}
      <div className="analytics-charts">
        <IncomeExpenseChart />
        <CategoryPieChart />
      </div>
    </div>
  )
}

export default Analytics
