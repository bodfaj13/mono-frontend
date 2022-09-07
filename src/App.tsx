import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Protectedroute from './components/protectedroute/protectedroute';
import Accounts from './pages/dashboard/accounts/accounts';
import Dasboard from './pages/dashboard/dashboard';
// import Dashboardmain from './pages/dashboard/dashboardmain/dashboardmain';
import Settings from './pages/dashboard/settings/settings';
import Transactions from './pages/dashboard/transactions/transactions';
import Signin from './pages/signin/signin';
import Signup from './pages/signup/signup';
import { useSelector } from 'react-redux';
import { combineReducersInterface } from './core/reducers/index-interface';
import { userReducerInterface } from './core/reducers/userreducer/userreducer-interface';
import { setAuthToken } from './api';

const App = () => {
  const state: any = useSelector<combineReducersInterface>(state => ({
    token: state.userReducer.token,
  }))

  const { token }: userReducerInterface = state
  setAuthToken(token)

  return (
    <div className='app'>
      <Routes>
        <Route element={<Protectedroute />}>
          <Route path="/dashboard" element={<Dasboard />}>
            <Route path="/dashboard" element={<Accounts />} />

            {/* <Route path="/dashboard/accounts" element={<Accounts />} /> */}

            <Route path="/dashboard/transactions/:accountId" element={<Transactions />} />

            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="/signup" element={<Signup />} />

        <Route path="/signin" element={<Signin />} />

        <Route path="/" element={<Signin />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App