/* @flow */
import React from 'react'
import { Link } from 'react-router'
import s from './HomeView.scss'
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import Map from '../../components/Map/Map.js'
import Dimensions from 'react-dimensions'

export class HomeView extends React.Component {

  static propTypes = {
    containerWidth: React.PropTypes.number.isRequired,
    containerHeight: React.PropTypes.number.isRequired,
    route: React.PropTypes.object.isRequired
  };

  renderMap () {
    if (this.props.containerWidth > 680) {
      return (
        <Map />
      )
    } return
  }

  render () {
    return (
      <div className={s.root}>
        <Header fixed={false} home route={this.props.route}/>
        <div className={s.fakeunder}></div>
        <div className={s.welcome}>
          {this.renderMap()}
          <div className={s.floatingdiv}>
            <span className={s.welcometoptext}>Predict Elections</span>
            <span className={s.welcomebottomtext}>Win Money</span>
            <div className={s.floatingbuttondiv}>
              <Link to='/games'>
                <div className={s.buttondiv}>
                  <span className={s.buttontext}>PLAY NOW</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Dimensions()(HomeView)
