import React, { Component } from 'react'
import s from './Navigation.scss'
import { Link } from 'react-router'
import { actions as profileActions } from '../../redux/modules/profile'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ReactART from 'react-art'
var Shape = ReactART.Shape
var Surface = ReactART.Surface

const mapStateToProps = (state) => ({
  profile: state.profile,
  router: state.router
})

const mapDispatchToProps = (dispatch) => ({
  profileActions: bindActionCreators(profileActions, dispatch)
})

export class Navigation extends Component {

  constructor (props) {
    super(props)

    this.state = {
      dropdown: false
    }

    this.showLock = this.showLock.bind(this)
    this.logOut = this.logOut.bind(this)
    this.handleDropDown = this.handleDropDown.bind(this)
  }

  static propTypes = {
    containerWidth: React.PropTypes.number.isRequired,
    profile: React.PropTypes.object.isRequired,
    profileActions: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object,
    history: React.PropTypes.object
  };

  componentWillMount () {
    this.props.profileActions.createLock(this.props.profile)
  }

  componentDidMount () {
    // this.lock.getProfile(this.state.idToken, function (err, profile) {
    //   if (err) {
    //     console.log('Error loading the Profile', err)
    //     return
    //   }
    //   this.setState({profile: profile})
    // }.bind(this))
    this.props.profileActions.getProfile(this.props.profile)
    if (this.props.profile.profile) {
      this.props.profileActions.getBalance(this.props.profile.balance)
    } else {
      if (this.props.profile.error) {
        this.props.profileActions.logout()
      }
    }
    if (Object.keys(this.props.profile.ga).length > 0) {
      this.props.profile.ga.pageview(this.props.router.locationBeforeTransitions.pathname + this.props.router.locationBeforeTransitions.hash)
    }

    this.timer = setTimeout(() => {
      this.props.profileActions.getProfile(this.props.profile)
    }, 1500)
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  showLock () {
    // We receive lock from the parent component in this case
    // If you instantiate it in this component, just do this.lock.show()
    // console.log('this.props.lock')
    if (this.props.route.path === '/') {
      localStorage.removeItem('userToken')
      this.props.profile.lock.show({
        icon: 'https://s3-us-west-2.amazonaws.com/static-assets-fanpol/sadcyclops.png',
        primaryColor: '#5c666f',
        socialBigButtons: true,
        callbackURL: 'http://localhost:3000/games',
        responseType: 'token'})
    } else {
      localStorage.removeItem('userToken')
      this.props.profile.lock.show({
        icon: 'https://s3-us-west-2.amazonaws.com/static-assets-fanpol/sadcyclops.png',
        primaryColor: '#5c666f',
        socialBigButtons: true,
        callbackURL: 'http://localhost:3000/games',
        responseType: 'token'})
    }
  }

  logOut () {
    // localStorage.removeItem('userToken')
    // var getFoos = fetch('https://api.fantasypollster.com/api/users/balance', {
    //   headers: {
    //     'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //   },
    //   method: 'GET',
    //   cache: false
    // })
    // console.log('token: ', localStorage.getItem('userToken'))
    // getFoos.then(function (response) {
    //   response.json().then(function (foos) {
    //     console.log('the balance:', foos)
    //   })
    // })
    this.context.router.push('/')
    this.props.profileActions.logout()

    // this.context.history.pushState(null, '/')
  }

  handleDropDown () {
    if (this.state.dropdown) {
      this.setState({dropdown: false})
    } else {
      this.setState({dropdown: true})
    }
  }

  showDropDown () {
    if (this.state.dropdown) {
      if (this.props.profile.idToken === null || this.props.profile.idToken === '') {
        return (
          <div className={s.coverpage}>
            <Link className={s.linksmall} to='/games'>Games</Link>
            <span className={s.linksmall} onClick={this.showLock}>Sign in</span>
          </div>
        )
      } else if (this.props.profile.profile) {
        return (
          <div className={s.coverpage}>
            <Link className={s.linksmall} to='/games'>Games</Link>
            <Link className={s.linksmall} to='/games/mine'>Portfolio</Link>
            <Link className={s.linksmall} to='/points'>{'Balance: $' + this.props.profile.balance.toFixed(2)}</Link>
            <span className={s.linksmall} onClick={this.logOut}>Logout</span>
          </div>
        )
      } else {
        <div className={s.coverpage}>
          <Link className={s.linksmall} to='/games'>Games</Link>
          <Link className={s.linksmall} to='/games/mine'>Portfolio</Link>
          <Link className={s.linksmall} to='/points'>{'Balance: $' + this.props.profile.balance.toFixed(2)}</Link>
          <span className={s.linksmall} onClick={this.logOut}>Logout</span>
        </div>
      }
      return (
        <div className={s.coverpage}>
          <Link className={s.linksmall} to='/games'>Games</Link>
          <span className={s.linksmall}>Loading profile</span>
          <Link className={s.linksmall} to='/points'>Balance: </Link>
          <Link className={s.linksmall} to='/points'>{'Balance: $' + this.props.profile.balance.toFixed(2)}</Link>
          <span className={s.linksmall} onClick={this.logOut}>Logout</span>
        </div>
      )
    }
  }

  render () {
    if (this.props.containerWidth < 692) {
      return (
        <div className={s.root2} role='navigation'>
          <div className={s.r} onClick={this.handleDropDown}>
            <Surface height={20} width={20}>
              <Shape d={'M19,2.59766H1c-0.55,0-1-0.45-1-1V1c0-0.55,0.45-1,1-1h18c0.55,0,1,0.45,1,1v0.59766C20,2.14766,19.55,2.59766,19,2.59766z M19,20H1c-0.55,0-1-0.45-1-1v-0.59766c0-0.55,0.45-1,1-1h18c0.55,0,1,0.45,1,1V19C20,19.55,19.55,20,19,20z M19,11.29883H1c-0.55,0-1-0.45-1-1V9.70117c0-0.55,0.45-1,1-1h18c0.55,0,1,0.45,1,1v0.59766C20,10.84883,19.55,11.29883,19,11.29883z'} fill={'#FFFFFF'}/>
            </Surface>
          </div>
          {this.showDropDown()}
        </div>
      )
    } else if (this.props.profile.idToken === null || this.props.profile.idToken === '') {
      return (
        <div className={s.root} role='navigation'>
          <Link className={s.link} to='/games'>Games</Link>
          <span className={s.link} onClick={this.showLock}>Sign in</span>
        </div>
      )
    } else if (this.props.profile.profile) {
      return (
        <div className={s.root} role='navigation'>
          <Link className={s.link} to='/games'>Games</Link>
          <Link className={s.link} to='/games/mine'>Portfolio</Link>
          <Link className={s.link} to='/points'>{'Balance: $' + this.props.profile.balance.toFixed(2)}</Link>
          <span className={s.link} onClick={this.logOut}>Logout</span>
        </div>
      )
    } else {
      return (
        <div className={s.root} role='navigation'>
          <Link className={s.link} to='/games'>Games</Link>
          <Link className={s.link} to='/games/mine'>Portfolio</Link>
          <span className={s.link}>Loading profile</span>
          <Link className={s.link} to='/points'>Balance: </Link>
          <Link className={s.link} to='/points'>{'Balance: $' + this.props.profile.balance.toFixed(2)}</Link>
          <span className={s.link} onClick={this.logOut}>Logout</span>
        </div>
      )
    }
  }

  // render () {
  //   console.log(this.props.route, 'hi')
  //   if (this.props.profile.idToken === '') {
  //     return (
  //       <div className={s.root} role='navigation'>
  //         <Link className={s.link} to='/games'>Games</Link>
  //         <span className={s.link} onClick={this.showLock}>Sign in</span>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div className={s.root} role='navigation'>
  //         <Link className={s.link} to='/games'>Games</Link>
  //         <span className={s.link} onClick={this.showLock}>Sign in</span>
  //       </div>
  //     )
  //   }
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
