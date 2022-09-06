import { http } from "../index"
import { userSigninPayload, userSignupPayload } from "./userauth-interface"

/**
 * User signup
 * @param  data Object
 * @returns axios http response
 */
export const signup = (data: userSignupPayload) => {
  return http.post('/users/signup', data)
}

/**
 * User signin
 * @param  data Object
 * @returns axios http response
 */
export const signin = (data: userSigninPayload) => {
  return http.post('/users/login', data)
}
