import { Dispatch } from 'redux'
import { setAuthToken } from '../../../api'
import { ActionTypes } from '../types'
import { loginUserInterface, loginUserPayload, logoutUserInterface, updateUserInterface } from './useraction-interface'

/**
 * Logins the user
 * @param  payload object
 * @returns dispacth
 */
export const loginUser = (payload: loginUserPayload) => {
  return (dispatch: Dispatch) => {
    setAuthToken(payload.token)
    dispatch<loginUserInterface>({
      type: ActionTypes.LOGIN_USER,
      payload
    })
  }
}

/**
 * logsout the user
 * null http Authorization header
 * @returns dispacth
 */
export const logoutUser = () => {
  window.localStorage.clear()
  return (dispatch: Dispatch) => {
    setAuthToken(null)
    dispatch<logoutUserInterface>({
      type: ActionTypes.LOGOUT_USER
    })
  }
}


/**
 * Update user atrribute
 * @param any payload 
 * @returns dispatch
 */
export const updateUser = (payload: any) => {
  return (dispatch: Dispatch) => {
    dispatch<updateUserInterface>({
      type: ActionTypes.UPDATE_USER,
      payload
    })
  }
}