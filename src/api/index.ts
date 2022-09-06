import axios from "axios";
import appDetails from "../appdetails";
import { handleUnAuthorized } from "./requesterror";

export const REACT_APP_BASE_URL = appDetails.REACT_APP_BASE_URL

/**
 * Axios instance with auth
 */
export const http = axios.create({
  baseURL: REACT_APP_BASE_URL,
  // timeout: 5000,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
})

/**
 * Set token headers
 * @param token string
 */
export const setAuthToken = (token: string | null) => {
  if (token !== null) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"]
  }
}

// get the redux state
// const state: any = persistor.getState()
// const dispatchStore: any = store.dispatch

// const exp = state?.userReducer?.user?.exp
// const refreshToken = state?.userReducer?.refreshToken

// const exp: any = localStorage.getItem('exp')
// const refreshToken = localStorage.getItem('refreshToken')
// const token = localStorage.getItem('token')

/**
 * Request interceptor that handles refreash token 
 */
// http.interceptors.request.use(async req => {
//   const isExpired = dayjs.unix(exp).diff(dayjs()) < 1

//   if (isExpired) return req

//   const res = await axios.post(`${REACT_APP_BASE_URL}/refresh`, {
//     refreshToken
//   }, {
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   })

//   const { access_token, refresh_token } = res.data.data

//   console.log('requesting new....')

//   const user: any = jwt_decode(access_token)
//   localStorage.setItem('token', access_token)
//   localStorage.setItem('refreshToken', refresh_token)
//   localStorage.setItem('exp', user.exp)


//   dispatchStore(loginUser({
//     success: true,
//     token: access_token,
//     user,
//     exp: user.exp,
//     refreshToken: refresh_token,
//   }))

//   return req
// })

/**
 * Handle Authrizatin failed
 */
http.interceptors.response.use(undefined, error => {
  if (error.response === undefined) {
    handleUnAuthorized()
  }
  // else {
  //   if (error.response.data.message === "Full authentication is required to access this resource") {
  //     handleUnAuthorized()
  //   }
  // }

  return Promise.reject(error)
})