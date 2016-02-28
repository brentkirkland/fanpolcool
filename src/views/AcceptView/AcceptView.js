import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { actions as profileActions } from '../../redux/modules/profile'
import s from './AcceptView.scss'
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import { bindActionCreators } from 'redux'
// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  router: state.router,
  profile: state.profile,
})

const mapDispatchToProps = (dispatch) => ({
  profileActions: bindActionCreators(profileActions, dispatch),
})
export class AcceptView extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      state: '',
      okay: true
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  handleSelect (e) {
    // Arizona, Hawaii, Iowa, Louisiana, Mississippi, Montana, Nevada, and Washington
    var state = e.target.value

    if (state === 'Arizona' || state === 'Hawaii' || state === 'Iowa' || state === 'Louisiana' || state === 'Mississippi' || state === 'Montana' || state === 'Nevada' || state === 'Washington') {
      this.setState({state: state, okay: false})
    } else {
      this.setState({state: state, okay: true})
    }
  }

  static propTypes = {
    profile: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    if (this.props.profile.idToken === null || this.props.profile.idToken === '') {
      this.context.router.push('/games')
    }
  }

  handleClick () {
    this.props.profileActions.agree(this.state.state)
    if (this.props.router.locationBeforeTransitions.hash !== "") {
      var address = this.props.router.locationBeforeTransitions.hash.split('state=')[1]
      if (this.props.profile.idToken !== null && this.props.profile.idToken !== "") {
        // console.log('address', address)
        this.context.router.push('/points#state=' + address)
      }
    } else {
      this.context.router.push('/points')
    }
  }

  renderOkay () {
    if (this.state.okay && this.state.state !== '') {
      return (
        <div className={s.container2}>
          <span className={s.good}>Awesome you passed the test!</span>
          <span className={s.agree}>By using this website, you agree to the <a className={s.aref} href='/terms'>Terms of Use</a> and <a className={s.aref} href='/privacy'>Privacy Policy</a>.</span>
          <div className={s.button} onClick={this.handleClick}>
            <span className={s.accept}>Accept and Continue</span>
          </div>
        </div>
      )
    } else if (!this.state.okay && this.state.state !== '') {
      return (
        <div className={s.container2}>
          <span className={s.error}>Uh oh! You're state is ineligible. You're welcome to play but you may not cash out.</span>
          <span className={s.agree}>By using this website, you agree to the <a className={s.aref} href='/terms'>Terms of Use</a> and <a className={s.aref} href='/privacy'>Privacy Policy</a>.</span>
          <div className={s.button} onClick={this.handleClick}>
            <span className={s.accept}>Accept and Continue</span>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div className={s.root}>
        <Header fixed={false} home route={this.props.route}/>
        <div className={s.fakeunder}></div>
        <div className={s.container}>
          <span className={s.title}>User Agreement</span>
          <span className={s.where}>What state do you live in?</span>
          <select onChange={this.handleSelect} className={s.select}>
            <option value=''>State</option>
            <option value='Alabama'>Alabama</option>
            <option value='Alaska'>Alaska</option>
            <option value='Arizona'>Arizona</option>
            <option value='Arkansas'>Arkansas</option>
            <option value='California'>California</option>
            <option value='Colorado'>Colorado</option>
            <option value='Connecticut'>Connecticut</option>
            <option value='Delaware'>Delaware</option>
            <option value='District Of Columbia'>District Of Columbia</option>
            <option value='Florida'>Florida</option>
            <option value='Georgia'>Georgia</option>
            <option value='Hawaii'>Hawaii</option>
            <option value='Idaho'>Idaho</option>
            <option value='Illinois'>Illinois</option>
            <option value='Indiana'>Indiana</option>
            <option value='Iowa'>Iowa</option>
            <option value='Kansas'>Kansas</option>
            <option value='Kentucky'>Kentucky</option>
            <option value="'Louisiana'">Louisiana</option>
            <option value="'Maine'">Maine</option>
            <option value='Maryland'>Maryland</option>
            <option value='Massachusetts'>Massachusetts</option>
            <option value='Michigan'>Michigan</option>
            <option value='Minnesota'>Minnesota</option>
            <option value='Mississippi'>Mississippi</option>
            <option value='Missouri'>Missouri</option>
            <option value='Montana'>Montana</option>
            <option value='Nebraska'>Nebraska</option>
            <option value='Nevada'>Nevada</option>
            <option value='>New Hampshire'>New Hampshire</option>
            <option value='New Jersey'>New Jersey</option>
            <option value='New Mexico'>New Mexico</option>
            <option value='New York'>New York</option>
            <option value='North Carolina'>North Carolina</option>
            <option value='North Dakota'>North Dakota</option>
            <option value='Ohio'>Ohio</option>
            <option value='Oklahoma'>Oklahoma</option>
            <option value='Oregon'>Oregon</option>
            <option value='Pennsylvania'>Pennsylvania</option>
            <option value='Rhode Island'>Rhode Island</option>
            <option value='South Carolina'>South Carolina</option>
            <option value='South Dakota'>South Dakota</option>
            <option value='Tennessee'>Tennessee</option>
            <option value='Texas'>Texas</option>
            <option value='Utah'>Utah</option>
            <option value='Vermont'>Vermont</option>
            <option value='Virginia'>Virginia</option>
            <option value='Washington'>Washington</option>
            <option value='West Virginia'>West Virginia</option>
            <option value='Wisconsin'>Wisconsin</option>
            <option value='Wyoming'>Wyoming</option>
          </select>
          {this.renderOkay()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptView)
