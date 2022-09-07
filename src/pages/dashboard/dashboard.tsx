import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/dashboard/sidebar/sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import Dashboardnav from '../../components/dashboard/nav/nav'


const Dasboard = () => {
  const location = useLocation()
  const [showSideBar, setShowSideBar] = useState(false)

  const updateSideBar = (value: boolean) => {
    setShowSideBar(value)
  }

  useEffect(() => {
   updateSideBar(false)
  }, [location])


  return (
    <div className="dashboard">
      <Sidebar showSideBar={showSideBar} />
      <div className="dashboard-main">
        <div className="dashboard-content">
          <Dashboardnav
            updateSideBar={updateSideBar}
            showSideBar={showSideBar}
          />
          <div className="outlet-holder">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dasboard