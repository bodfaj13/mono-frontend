import React, { useState } from 'react'
import Sidebar from '../../components/dashboard/sidebar/sidebar'
import { Outlet } from 'react-router-dom'
import Dashboardnav from '../../components/dashboard/nav/nav'


const Dasboard = () => {
  const [showSideBar, setShowSideBar] = useState(false)

  const updateSideBar = (value: boolean) => {
    setShowSideBar(value)
  }

  return (
    <div className="dashboard">
      <Sidebar showSideBar={showSideBar} />
      <div className="dashboard-main">
        <div className="dashboard-content">
          <Dashboardnav
            updateSideBar={updateSideBar}
            showSideBar={showSideBar}
          />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dasboard