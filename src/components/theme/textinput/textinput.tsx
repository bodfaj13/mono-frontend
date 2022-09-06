import React from 'react'
import { textinputInterface } from './textinput-interface'
import { Input } from 'antd'

const Textinput = ({ placeHolder, name, onChange, disabled, hasError, updateField }: textinputInterface) => {
  return (
    <div className={`textinput ${hasError ? 'has-error' : ''}`}>
      <Input
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

Textinput.defaultProps = {
  onChange: undefined,
  disabled: false,
  hasError: false,
  updateField: undefined
}

export default Textinput