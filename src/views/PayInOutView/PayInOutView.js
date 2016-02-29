import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { actions as profileActions } from '../../redux/modules/profile'
import s from './PayInOutView.scss'
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
  profile: state.profile
})

const mapDispatchToProps = (dispatch) => ({
  profileActions: bindActionCreators(profileActions, dispatch)
})
export class PayInOutView extends React.Component {

  constructor (props) {
    super(props)
    this.handleClick5 = this.handleClick5.bind(this)
    this.handleClick10 = this.handleClick10.bind(this)
    this.handleClick20 = this.handleClick20.bind(this)
    this.handleClick50 = this.handleClick50.bind(this)
    this.handleClick100 = this.handleClick100.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleReturnValue = this.handleReturnValue.bind(this)

    this.state = {
      submit: false,
      email: '',
      addressline1: '',
      addressline2: '',
      city: '',
      zip: '',
      state: '',
      method: '',
      amount: 0,
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
    this.handleCheckBox = this.handleCheckBox.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleAddressLine1 = this.handleAddressLine1.bind(this)
    this.handleAddressLine2 = this.handleAddressLine2.bind(this)
    this.handleCity = this.handleCity.bind(this)
    this.handleZip = this.handleZip.bind(this)
    this.handleState = this.handleState.bind(this)
    this.handleName = this.handleName.bind(this)
  }

  static propTypes = {
    route: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    profile: React.PropTypes.object.isRequired,
    profileActions: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentWillMount () {
    this.setState({amount: 0, inputamount: '', error: 'Select an amount above.', highlight: false, acceptable: false})
  }

  componentDidMount () {
    if (localStorage.getItem('userToken') === null) {
      this.context.router.push('/games')
    }
  }

  whatToDarken (num) {
    if (num === this.state.amount) {
      if (num === 5) {
        return s.pointsBox2Dark
      } else {
        return s.pointsBox2Dark
      }
    } else {
      if (num === 5) {
        return s.pointsBox2
      } else {
        return s.pointsBox2
      }
    }
  }

  handleChange (e) {
    if (e.target.value < 5) {
      return this.setState({amount: 0, highlight: false, error: 'Custom amount must be greater than or equal to $5.', acceptable: false})
    } else {
      return this.setState({amount: Number(e.target.value).toFixed(2), highlight: true, error: 'Check out with PayPal. Orders are made out to Livv, Inc.', acceptable: true})
    }
  }

  handleClick5 () {
    this.setState({amount: 5, acceptable: true, highlight: false, error: 'Check out with PayPal. Orders are made out to Livv, Inc.'})
  }
  handleClick10 () {
    this.setState({amount: 10, acceptable: true, highlight: false, error: 'Check out with PayPal. Orders are made out to Livv, Inc.'})
  }
  handleClick20 () {
    this.setState({amount: 20, acceptable: true, highlight: false, error: 'Check out with PayPal. Orders are made out to Livv, Inc.'})
  }
  handleClick50 () {
    this.setState({amount: 50, acceptable: true, highlight: false, error: 'Check out with PayPal. Orders are made out to Livv, Inc.'})
  }
  handleClick100 () {
    this.setState({amount: 100, acceptable: true, highlight: false, error: 'Check out with PayPal. Orders are made out to Livv, Inc.'})
  }

  pointsBox3 () {
    if (this.state.highlight) {
      return s.pointsBox3Dark
    } else {
      return s.pointsBox3
    }
  }

  handlePayPal () {
    if (this.state.acceptable) {
      return (
        <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
          <input type='hidden' name='cmd' value='_xclick'/>
          <input type='hidden' name='business' value='WR3V3DZ5JFR84'/>
          <input type='hidden' name='lc' value='US'/>
          <input type='hidden' name='item_name' value='Fantasy Pollster Points'/>
          <input type='hidden' name='custom' value={this.props.profile.profile.user_id}/>
          <input type='hidden' name='button_subtype' value='services'/>
          <input type='hidden' name='no_note' value='1'/>
          <input type='hidden' name='no_shipping' value='1'/>
          <input type='hidden' name='rm' value='1'/>
          <input type='hidden' name='return' value={this.handleReturnValue()}/>
          <input type='hidden' name='cancel_return' value='https://www.fantasypollster.com/points'/>
          <input type='hidden' name='currency_code' value='USD'/>
          <input type='hidden' name='amount' value={this.state.amount.toString()}/>
          <input type='hidden' name='bn' value='PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted'/>
          <input type='hidden' name='notify_url' value='https://api.fantasypollster.com/api/users/ipn'/>
          <input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'/>
          <img alt='' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'/>
        </form>
      )
    }
    return
  }

  handleReturnValue () {
    if (this.props.router.locationBeforeTransitions.hash !== '') {
      var address = this.props.router.locationBeforeTransitions.hash.split('state=')[1]
      if (this.props.profile.idToken !== null && this.props.profile.idToken !== '') {
        // this.context.router.push('/points#state=' + address)
        return 'https://www.fantasypollster.com/games/' + address
      }
    }
    return 'https://www.fantasypollster.com/games'
  }

  render () {
    return (
      <div className={s.root}>
        <Header fixed={false} home route={this.props.route}/>
        <div className={s.fakeunder}></div>
        <div className={s.container}>
          <span className={s.title}>Buy Fantasy Pollster Points</span>
          <span className={s.information}>Points are required to play games. You can transfer your points back to your PayPal account at anytime.</span>
          <div className={s.pointsRow}>
            <div className={this.whatToDarken(5)} onClick={this.handleClick5}>
              <span className={s.pointsText}>5 Points</span>
              <span className={s.dollarsText}>$5</span>
            </div>
            <div className={this.whatToDarken(10)} onClick={this.handleClick10}>
              <span className={s.pointsText}>10 Points</span>
              <span className={s.dollarsText}>$10</span>
            </div>
            <div className={this.whatToDarken(20)} onClick={this.handleClick20}>
              <span className={s.pointsText}>20 Points</span>
              <span className={s.dollarsText}>$20</span>
            </div>
            <div className={this.whatToDarken(50)} onClick={this.handleClick50}>
              <span className={s.pointsText}>50 Points</span>
              <span className={s.dollarsText}>$50</span>
            </div>
            <div className={this.whatToDarken(100)} onClick={this.handleClick100}>
              <span className={s.pointsText}>100 Points</span>
              <span className={s.dollarsText}>$100</span>
            </div>
            <div className={this.pointsBox3()}>
              <span className={s.pointsText}>Custom Amount</span>
              <div className={s.enterDiv}>
                <span className={s.dollarsText2}>$</span><input type='number' onChange={this.handleChange} className={s.dollarsInput}></input>
              </div>
            </div>
          </div>
          <div className={s.paypal}>
            <span className={s.instructions}>{this.state.error}</span>
            {this.handlePayPal()}
          </div>
        </div>
        <div className={s.container2}>
          <span className={s.title}>Pay Out</span>
          <span className={s.information}>Refund points back to your PayPal account or via check.</span>
          {this.renderCheckBox()}
          {this.renderInputs()}
          {this.renderSubmit()}
        </div>
        <Footer />
      </div>
    )
  }

  renderInputs () {
    if (this.state.submit === true && !(this.state.email === '' || this.state.addressline1 === '' || this.state.city === '' || this.state.zip === '' || this.state.state === '' || this.state.method === '')) {
      return
    } else {
      return (
        <div className={s.inputs}>
          <input type='number' className={s.amount} placeholder='$ Amount' onChange={this.handleAmount}></input>
          <input type='text' placeholder='Email' onChange={this.handleEmail}></input>
          <input type='text' placeholder='Name' onChange={this.handleName}></input>
          <input type='text' placeholder='Address Line 1' onChange={this.handleAddressLine1}></input>
          <input type='text' placeholder='Address Line 2' onChange={this.handleAddressLine2}></input>
          <input type='text' placeholder='City' onChange={this.handleCity}></input>
          <input type='text' placeholder='State' onChange={this.handleState}></input>
          <input type='number' className={s.amount} placeholder='Zip' onChange={this.handleZip}></input>
        </div>
      )
    }
  }

  renderCheckBox () {
    if (this.state.submit === true && !(this.state.email === '' || this.state.addressline1 === '' || this.state.city === '' || this.state.zip === '' || this.state.state === '' || this.state.method === '')) {
      return
    }
    if (this.state.method === '') {
      return (
        <div className={s.checkboxes}>
          <input type='checkbox' value='Paypal' onClick={this.handleCheckBox}></input> <span className={s.checkboxspan}>Paypal</span>
          <input type='checkbox' value='Check' onClick={this.handleCheckBox}></input> <span className={s.checkboxspan}>Check</span>
        </div>
      )
    } else if (this.state.method === 'Paypal') {
      return (
        <div className={s.checkboxes}>
          <input type='checkbox' value='Paypal' onClick={this.handleCheckBox} checked></input> <span className={s.checkboxspan}>Paypal</span>
          <input type='checkbox' value='Check' onClick={this.handleCheckBox}></input> <span className={s.checkboxspan}>Check</span>
        </div>
      )
    } else {
      return (
        <div className={s.checkboxes}>
          <input type='checkbox' value='Paypal' onClick={this.handleCheckBox}></input> <span className={s.checkboxspan}>Paypal</span>
          <input type='checkbox' value='Check' onClick={this.handleCheckBox} checked></input> <span className={s.checkboxspan}>Check</span>
        </div>
      )
    }
  }

  handleCheckBox (e) {
    this.setState({method: e.target.value, submit: false})
  }

  handleName (e) {
    this.setState({name: e.target.value, submit: false})
  }

  handleAmount (e) {
    this.setState({amount: e.target.value, submit: false})
  }

  handleEmail (e) {
    this.setState({email: e.target.value, submit: false})
  }

  handleAddressLine1 (e) {
    this.setState({addressline1: e.target.value, submit: false})
  }

  handleAddressLine2 (e) {
    this.setState({addressline2: e.target.value, submit: false})
  }

  handleCity (e) {
    this.setState({city: e.target.value, submit: false})
  }

  handleZip (e) {
    this.setState({zip: e.target.value, submit: false})
  }

  handleState (e) {
    this.setState({state: e.target.value, submit: false})
  }

  // email: '',
  // addressline1: '',
  // addressline2: '',
  // city: '',
  // zip: '',
  // state: '',
  // method: ''
  renderSubmit () {
    if (this.state.submit === true && (this.state.email === '' || this.state.addressline1 === '' || this.state.city === '' || this.state.zip === '' || this.state.state === '' || this.state.method === '' || this.state.amount === 0 || this.state.name === '')) {
      return (
        <div className={s.submitdiv}>
          <div className={s.submitPayout} onClick={this.handleSubmit}><span className={s.submitText}>SUBMIT</span></div>
          <span className={s.submitError}>Form is incomplete! Please fill in the information above.</span>
        </div>
      )
    } else if (this.state.submit === true && !(this.state.email === '' || this.state.addressline1 === '' || this.state.city === '' || this.state.zip === '' || this.state.state === '' || this.state.method === '' || this.state.amount === 0 || this.state.name === '')) {
      return (
        <div className={s.submitdiv}>
          <span className={s.submitGood}>Awesome! Look out for an email from us containing more details. If you don't see an email within 8 hours, fill this form out again. If you still don't see one, contact us directly at accounts@fantasypollster.com</span>
        </div>
      )
    } else {
      return (
        <div className={s.submitdiv}>
          <div className={s.submitPayout} onClick={this.handleSubmit}><span className={s.submitText}>SUBMIT</span></div>
        </div>
      )
    }
  }

  handleSubmit () {
    this.setState({submit: true})
    var address = this.state.addressline1 + ', ' + this.state.addressline2 + ', ' + this.state.city + ', ' + this.state.state + ' ' + this.state.zip
    var amount = this.state.amount
    var check
    if (this.state.method === 'Paypal') {
      check = true
    } else {
      check = false
    }
    var name = this.state.name
    var email = this.state.email
    // console.log('address, amount, check, name, email', address, amount, check, name, email)
    this.props.profileActions.payout(amount, address, check, email, name)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(PayInOutView)
