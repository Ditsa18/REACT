import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.png'

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
      {/* Header */}
      <div className="sidebar-header">
        <img src={logo} alt="CashFlow Logo" className="sidebar-logo" />
        <span className="sidebar-title">CashFlow</span>
      </div>

      {/* Toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        <FontAwesomeIcon
          icon={collapsed ? 'chevron-right' : 'chevron-left'}
        />
      </button>

      {/* Navigation */}
      <nav className="sidebar-nav">
  <NavLink
    to="/app/dashboard"
    className={({ isActive }) =>
      `sidebar-link ${isActive ? 'active' : ''}`
    }
  >
    <FontAwesomeIcon icon="chart-line" />
    <span className="link-text">Dashboard</span>
  </NavLink>

  <NavLink
    to="/app/transactions"
    className={({ isActive }) =>
      `sidebar-link ${isActive ? 'active' : ''}`
    }
  >
    <FontAwesomeIcon icon="receipt" />
    <span className="link-text">Transactions</span>
  </NavLink>

  <NavLink
    to="/app/history"
    className={({ isActive }) =>
      `sidebar-link ${isActive ? 'active' : ''}`
    }
  >
    <FontAwesomeIcon icon="clock-rotate-left" />
    <span className="link-text">History</span>
  </NavLink>

  <NavLink
    to="/app/analytics"
    className={({ isActive }) =>
      `sidebar-link ${isActive ? 'active' : ''}`
    }
  >
    <FontAwesomeIcon icon="chart-pie" />
    <span className="link-text">Analytics</span>
  </NavLink>

  <NavLink
    to="/app/categories"
    className={({ isActive }) =>
      `sidebar-link ${isActive ? 'active' : ''}`
    }
  >
    <FontAwesomeIcon icon="tags" />
    <span className="link-text">Categories</span>
  </NavLink>

  <NavLink
    to="/app/settings"
    className={({ isActive }) =>
      `sidebar-link ${isActive ? 'active' : ''}`
    }
  >
    <FontAwesomeIcon icon="gear" />
    <span className="link-text">Settings</span>
  </NavLink>
</nav>


    </aside>
  )
}

export default Sidebar
