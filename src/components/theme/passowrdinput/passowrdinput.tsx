import React from 'react'
import { passwordinputInterface } from './passowrdinput-interface'
import { Input } from 'antd'

const Passowrdinput = ({ placeHolder, name, onChange, disabled, hasError, updateField }: passwordinputInterface) => {
  return (
    <div className={`passowrdinput ${hasError ? 'has-error' : ''}`}>
      <Input.Password
        disabled={disabled}
        placeholder={placeHolder}
        bordered={false}
        onChange={(e) => {
          if (onChange !== undefined) {
            onChange(e.target.value)
          }
          if (updateField !== undefined) {
            updateField(name, e.target.value)
          }
        }}
      />
    </div>
  )
}

Passowrdinput.defaultProps = {
  onChange: undefined,
  disabled: false,
  hasError: false,
  updateField: undefined
}

export default Passowrdinput