import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Menu } from 'antd'
import {
  CaretUpFilled,
  CaretDownFilled
} from '@ant-design/icons';
import { navInterface } from './nav-interface';
import { useSelector, useDispatch } from 'react-redux';
import { combineReducersInterface } from '../../../core/reducers/index-interface';
import { userReducerInterface } from '../../../core/reducers/userreducer/userreducer-interface';
import { logoutUser } from '../../../core/actions/useractions/useractions';


const Dashboardnav = ({ updateSideBar, showSideBar }: navInterface) => {
  const navigate = useNavigate()
  const dispatch: any = useDispatch()

  const [visible, setVisible] = useState(false)


  const state: any = useSelector<combineReducersInterface>(state => ({
    user: state.userReducer.user
  }))

  const { user }: userReducerInterface = state;

  /**
   * logout user
   * Navigate to root route
   */
  const userlogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  /**
 * Menu 
 */
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={() => {
        userlogout()
      }}>
        <span>Log Out</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className='dashboard-nav'>
      <div className="top-section">
        <div className={`nav-mobile`}
          onClick={() => updateSideBar(!showSideBar)}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        <img src="https://app.moipayway.com/logo.png" alt="logo" />

        <p className="logo-name">
          MoiPayWay
        </p>
      </div>

      <div className="side-menu">
        <Dropdown
          overlay={menu}
          trigger={['click']}
          arrow={false}
          onVisibleChange={(value) => setVisible(value)}
        >
          <div className="userside-details">
            <div className="user-info">
              <p className="name">
                <span>Good morning,</span> {user?.firstName}
              </p>
            </div>

            <div className="img-holder">
              <Avatar size={40}>{`${user?.firstName.split('')[0]} ${user?.lastName.split('')[0]}`}</Avatar>
            </div>

            {
              visible ?
                <CaretUpFilled className="caret" />
                :
                <CaretDownFilled className="caret" />
            }
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Dashboardnav