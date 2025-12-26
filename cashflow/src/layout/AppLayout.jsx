import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Footer from './Footer'
import '../styles/layout.css'

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Topbar />

        <main className="main-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default AppLayout
