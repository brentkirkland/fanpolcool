import React, { Component } from 'react'
import s from './Footer.scss'
import { Link } from 'react-router'

class Header extends Component {

  render () {
    return (
      <div className={s.root}>
        <div className={s.container}>

          <span className={s.element2}>© 2016. All Rights Reserved</span>
          <Link to='/terms'><span className={s.element1}>Terms of Use</span></Link>
          <Link to='/privacy'><span className={s.element1}>Privacy Policy</span></Link>
          <Link to='/contact'><span className={s.element1}>Contact</span></Link>
        </div>
      </div>
    )
  }
}

export default Header
