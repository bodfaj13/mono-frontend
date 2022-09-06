import { ActionTypes } from '../types'

export interface loginUserPayload {
  success: boolean | null,
  token: string | null,
  user: any | null,
  exp: string | null,
  refreshToken: string | null,
}

export interface loginUserInterface {
  type: ActionTypes.LOGIN_USER,
  payload: loginUserPayload
}

export interface logoutUserInterface {
  type: ActionTypes.LOGOUT_USER
}

export interface updateUserInterface {
  type: ActionTypes.UPDATE_USER,
  payload: any
}

export type userActionTypes = loginUserInterface | logoutUserInterface | updateUserInterface 