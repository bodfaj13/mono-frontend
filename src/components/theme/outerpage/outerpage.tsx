import React from 'react'
import { outerpageInterface } from './outerpage-interface'

const Outerpage = ({ children, infoText }: outerpageInterface) => {
  return (
    <div className="outerpage">
      <div className="outerpage-content">
        <div className="content-top">
          <div className="logo-holder">
            <img src="/img/logo/logo.svg" alt="mono logo" />
          </div>
          <p className="info-text">
            {infoText}
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Outerpage