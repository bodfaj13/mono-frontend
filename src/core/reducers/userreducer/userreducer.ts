import { ActionTypes } from "../../actions/types"
import { userActionTypes } from "../../actions/useractions/useraction-interface"
import { userReducerInterface } from "./userreducer-interface"

const initialState = {
  loading: false,
  success: false,
  token: null,
  user: null,
  exp: null,
  refreshToken: null,
}

const userReducer = (state: userReducerInterface = initialState, action: userActionTypes) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        success: action.payload.success,
        token: action.payload.token,
        user: action.payload.user,
        exp: action.payload.exp,
        refreshToken: action.payload.refreshToken,
      }
    case ActionTypes.LOGOUT_USER:
      return {
        ...state,
        loading: false,
        success: false,
        token: null,
        user: null,
        exp: null,
        refreshToken: null,
      }
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
    default:
      return state
  }
}

export default userReducer