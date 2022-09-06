import { combineReducers } from 'redux'
import { combineReducersInterface } from './index-interface'
import userReducer from './userreducer/userreducer'

export default combineReducers<combineReducersInterface>({
  userReducer,
})