import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.png'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import LogoutModal from '../components/common/LogoutModal'

function Topbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [showLogout, setShowLogout] = useState(false)

  const titles = {
    '/app/dashboard': 'Dashboard',
    '/app/transactions': 'Transactions',
    '/app/analytics': 'Analytics',
    '/app/categories': 'Categories',
    '/app/settings': 'Settings',
    '/app/profile': 'Profile',
  }

  function confirmLogout() {
    logout()
    navigate('/')
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <img src={logo} alt="CashFlow" />
          <span>CashFlow</span>
        </div>

        <div className="topbar-center">
          <h3>{titles[location.pathname]}</h3>
        </div>

        <div className="topbar-right">
          {user && (
            <div
              className="topbar-profile clickable"
              onClick={() => navigate('profile')}
            >
              <FontAwesomeIcon icon="user-circle" />
              <span>Hi, {user.name}</span>
            </div>
          )}

          <button onClick={toggleTheme}>
            <FontAwesomeIcon
              icon={theme === 'light' ? 'moon' : 'sun'}
            />
          </button>

          <button onClick={() => setShowLogout(true)}>
            <FontAwesomeIcon icon="right-from-bracket" />
          </button>
        </div>
      </header>

      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          onConfirm={confirmLogout}
        />
      )}
    </>
  )
}

export default Topbar
