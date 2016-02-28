import React, { Component, PropTypes } from 'react'
import s from './Header.scss'
import { Link } from 'react-router'
import Navigation from '../Navigation/navigation'
import Dimensions from 'react-dimensions'
class Header extends Component {

  static propTypes = {
    containerWidth: React.PropTypes.number.isRequired,
    fixed: PropTypes.bool.isRequired,
    home: PropTypes.bool,
    route: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    location: React.PropTypes.object,
    history: React.PropTypes.object
  };

  render () {
    if (this.props.home) {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <Link className={s.brand} to='/'>
              <span className={s.brandTxt}>FantasyPollster</span>
            </Link>
            <Navigation key={'nav'} className={s.nav} route={this.props.route} containerWidth={this.props.containerWidth}/>
          </div>
        </div>
      )
    }
    if (this.props.fixed) {
      return (
        <div className={s.root2}>
          <div className={s.container}>
            <Link className={s.brand} to='/games'>
              <span className={s.brandTxt}>FantasyPollster</span>
            </Link>
            <Navigation key={'nav'} className={s.nav} route={this.props.route} containerWidth={this.props.containerWidth}/>
          </div>
        </div>
      )
    }
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link className={s.brand} to='/games'>
            <span className={s.brandTxt}>FantasyPollster</span>
          </Link>
          <Navigation key={'nav'} className={s.nav} route={this.props.route} containerWidth={this.props.containerWidth}/>
        </div>
      </div>
    )
  }
}

export default Dimensions()(Header)
