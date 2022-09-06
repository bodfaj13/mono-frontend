import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { menuList } from '../../../utils/routes'
import { sidebarInterface } from './sidebar-interface'
import { useSelector } from 'react-redux';
import { combineReducersInterface } from '../../../core/reducers/index-interface';
import { userReducerInterface } from '../../../core/reducers/userreducer/userreducer-interface';


const Sidebar = ({ showSideBar }: sidebarInterface) => {
  const navigate = useNavigate()
  const location = useLocation()

  const state: any = useSelector<combineReducersInterface>(state => ({
    user: state.userReducer.user
  }))

  const { user }: userReducerInterface = state;


  return (
    <div className={`sidebar ${showSideBar ? 'showSideBar' : ''}`}>
      <div className="top-section">
        <div className="logo-holder">
          <img src="/img/logo/whitelogo.svg" alt="mono logo" />
        </div>
      </div>

      <div className="menulist-holder">
        <ul>
          {
            menuList.map((item) => (
              item.level.includes(user.userLevel) ?
                <li
                  key={`${item.childId}`}
                  className={`menuchild ${item.route === location.pathname ? 'active' : ''}`} onClick={() => {
                    if (item.route !== '#') {
                      navigate(item.route)
                    }
                  }}>
                  <span className="menu-value">
                    {item.title}
                  </span>
                </li>
                : null
            ))
          }
        </ul>
      </div>


    </div>
  )
}

export default Sidebar