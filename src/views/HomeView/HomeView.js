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
    if (this.props.containerWidth > 930) {
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
        <div className={s.container} >
          <div className={s.top3}>
            <span className={s.slogan2}>
            FantasyPollster is the first fantasy competition for the United States elections.
            Prove to others that you're the next best pollster in hundreds of games for varying parties and states.
            </span>
          </div>
          <div className={s.top2}>
            <span className={s.title2}>Paid games, great prizes</span>
            <span className={s.slogan}>
            Put your knowledge to the test and win real
            money playing against real people. The rules are simple:
            select a game, confirm your prediction, and the most
            accurate players win.</span>
          </div>
          <div className={s.top2}>
            <span className={s.title2}>Free games, too!</span>
            <span className={s.slogan}>Don’t worry, you don’t have to
            use real money. If you are just in this for the
            fame and glory, you can play a free game instead.
            Although there are no cash prizes, free game winners
            get eternal bragging rights (...or at least until 2020).</span>
          </div>
          <div className={s.top2}>
            <span className={s.title2}>Completely legal</span>
            <span className={s.slogan}>
            Our games are fully compliant with US law.
            This is not a gambling website, nor is it a weird financial scheme.
            We offer fun, predictive, skill-based competitions with static entry fees and static prizes.</span>
          </div>
          <div className={s.top2}>
            <span className={s.title2}>Open Data</span>
            <span className={s.slogan}>
            {'Prediction markets have been proven to provide very ' +
            'accurate forecasts for presidential elections. That ' +
            'is why we are releasing the anonymized data from all of ' +
            'our games. And, of course, it is completely' +
            ' free (as in speech and beer).'}</span>
          </div>
          <div className={s.top4}>

          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Dimensions()(HomeView)
