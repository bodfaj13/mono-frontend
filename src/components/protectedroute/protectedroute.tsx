import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { combineReducersInterface } from '../../core/reducers/index-interface'
import { userReducerInterface } from '../../core/reducers/userreducer/userreducer-interface'
import { openNotificationWithIcon } from '../../utils/helpers'


const Protectedroute = () => {
  const state: any = useSelector<combineReducersInterface>((state) => ({
    success: state.userReducer.success,
    token: state.userReducer.token,
    user: state.userReducer.user
  }))

  const { success, token, user }: userReducerInterface = state

  if (success && token && user) {
    return <Outlet />
  } else {
    openNotificationWithIcon('error', 'Access Denied', 'Log in to continue.')
    return <Navigate to="/login" />
  }
}

export default Protectedroute
