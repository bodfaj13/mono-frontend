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


/**
 * Parse function for commaNumber
 * @param string 
 * @param separator 
 * @returns string
 */
 const parse = (string: any, separator: any) => {

  let i = ((string.length - 1) % 3) + 1

  if (i === 1 && (string[0] === '-')) {
    i = 4
  }

  const strings = [
    string.slice(0, i)
  ]

  for (; i < string.length; i += 3) {
    strings.push(separator, string.substr(i, 3))
  }

  return strings
}

/**
 * Return a string with the provided number formatted with commas.
 *  Can specify either a Number or a String.
 * @param number || string inputNumber 
 * @param optionalSeparator 
 * @param optionalDecimalChar 
 * @returns  string
 */
export const commaNumber = (inputNumber: number | string, optionalSeparator?: any, optionalDecimalChar?: any) => {

  const decimalChar = optionalDecimalChar || '.'

  let stringNumber

  {
    let number

    switch (typeof inputNumber) {

      case 'string':

        if (inputNumber.length < (inputNumber[0] === '-' ? 5 : 4)) {
          return inputNumber
        }

        stringNumber = inputNumber

        number = Number(
          (decimalChar !== '.') ? stringNumber.replace(decimalChar, '.') : stringNumber
        )
        break

      case 'number':
        stringNumber = String(inputNumber)
        number = inputNumber

        if ('.' !== decimalChar && !Number.isInteger(inputNumber)) {
          stringNumber = stringNumber.replace('.', decimalChar)
        }
        break

      default: return inputNumber
    }

    if ((-1000 < number && number < 1000) || isNaN(number) || !isFinite(number)) {
      return stringNumber
    }
  }

  {
    const decimalIndex = stringNumber.lastIndexOf(decimalChar)
    let decimal
    if (decimalIndex > -1) {
      decimal = stringNumber.slice(decimalIndex)
      stringNumber = stringNumber.slice(0, decimalIndex)
    }

    const parts = parse(stringNumber, optionalSeparator || ',')


    if (decimal) {
      parts.push(decimal)
    }

    return parts.join('')
  }
}