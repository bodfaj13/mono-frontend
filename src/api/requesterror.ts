// import { message } from "antd"
import { logoutUser } from "../core/actions/useractions/useractions"
import { store } from "../core/store"

const dispatchStore: any = store.dispatch

/**
 * Handle auth token error
 */
export const handleUnAuthorized = () => {
  // message.error('Authorization Failed')
  dispatchStore(logoutUser())
}