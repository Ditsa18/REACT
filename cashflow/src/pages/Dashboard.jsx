import SummaryCards from '../components/dashboard/SummaryCards'
import MonthlyHealth from '../components/dashboard/MonthlyHealth'
import TodayPulse from '../components/dashboard/TodayPulse'
import CategorySpotlight from '../components/dashboard/CategorySpotlight'
import InsightCard from '../components/dashboard/InsightCard'
import SpendingTrend from '../components/dashboard/SpendingTrend'

function Dashboard() {
  return (
    <div className="dashboard">

      {/* HERO */}
      <MonthlyHealth />

      {/* MAIN SUMMARY ROW */}
      <div className="dashboard-summary">
        <SummaryCards />
      </div>

      {/* SECONDARY */}
      <div className="dashboard-row">
        <TodayPulse />
        <CategorySpotlight />
      </div>

      {/* INSIGHTS */}
      <div className="dashboard-row">
        <SpendingTrend />
        <InsightCard />
      </div>

    </div>
  )
}

export default Dashboard
