import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from '../pages/Landing'
import Dashboard from '../pages/Dashboard'
import Transactions from '../pages/Transactions'
import History from '../pages/History'
import Analytics from '../pages/Analytics'
import Categories from '../pages/Categories'
import Settings from '../pages/Settings'
import Profile from '../pages/Profile'
import AppLayout from '../layout/AppLayout'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />

      {/* Protected App */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="history" element={<History />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="categories" element={<Categories />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
