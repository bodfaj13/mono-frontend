import { notification } from 'antd'
import validator from 'validator';

/**
 * Manages notifications
 * @param  type string
 * @param  msg string
 * @param  desc string
 * @returns 
 */
 export const openNotificationWithIcon = (type: 'success' | 'error' | 'warn', msg?: string, desc?: string) => {
  switch (type) {
    case 'success':
      return notification.success({
        message: msg,
        description: desc
      })
    case 'error':
      return notification.error({
        message: msg,
        description: desc
      })
    case 'warn':
      return notification.warn({
        message: msg,
        description: desc
      })
    default:
      return notification.info({
        message: msg,
        description: desc
      })
  }
}


/**
 * Validates password
 * @param  password string
 * @returns boolean
 */
 export const validatePassword = (password: string | undefined) => {
  if (password === undefined) {
    return true
  } else {
    if (validator.isStrongPassword(password.trim())) {
      return true
    }

    return false
  }
}