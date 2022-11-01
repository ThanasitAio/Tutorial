import React from 'react'
import Logo from'../img/LogoGun.png'

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        Made with and <b>React.js</b>.
      </span>
    </footer>
  )
}

export default Footer