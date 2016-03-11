/* @flow */
import React from 'react'
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import { connect } from 'react-redux'
import { actions as gamesActions } from '../../redux/modules/games'
import { actions as candidatesActions } from '../../redux/modules/candidates'
import { actions as mygamesActions } from '../../redux/modules/mygames'
import { actions as profileActions } from '../../redux/modules/profile'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import s from './MyGames.scss'
import Dimensions from 'react-dimensions'
import ReactToolTip from 'react-tooltip'

const mapStateToProps = (state) => ({
  games: state.games,
  mygames: state.mygames,
  profile: state.profile,
  candidates: state.candidates
})

const mapDispatchToProps = (dispatch) => ({
  gamesActions: bindActionCreators(gamesActions, dispatch),
  mygamesActions: bindActionCreators(mygamesActions, dispatch),
  profileActions: bindActionCreators(profileActions, dispatch),
  candidatesActions: bindActionCreators(candidatesActions, dispatch)
})

export class MyGames extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      time: Date.now()
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    containerWidth: React.PropTypes.number.isRequired,
    games: React.PropTypes.object.isRequired,
    mygames: React.PropTypes.object.isRequired,
    profile: React.PropTypes.object.isRequired,
    gamesActions: React.PropTypes.object.isRequired,
    mygamesActions: React.PropTypes.object.isRequired,
    profileActions: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
    routeParams: React.PropTypes.object.isRequired,
    candidates: React.PropTypes.object.isRequired,
    candidatesActions: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    this.props.gamesActions.getMine()
    this.props.gamesActions.fetchGamesIfNeeded()
    this.props.candidatesActions.fetchCandidatesIfNeeded()
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this).scrollIntoView()
    this.timer = setInterval(() => {
      this.setState({time: Date.now()})
    }, 1000)
    this.timer2 = setTimeout(() => {
      this.props.gamesActions.getMine()
    }, 1000)
  }

  componentDidUpdate () {
    if (this.props.candidates.items.length > 0 && this.props.games.mine.length === 0) {
      this.props.gamesActions.getMine()
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
    clearTimeout(this.timer2)
  }

  renderAd () {
    return (
      <div className={s.root4}>
        <div className={s.container22}>
          <span className={s.adtextgame}>{'PORTFOLIO'}</span>
          <span className={s.adtext}>{'| View your results (or mouse over --- to see remaining time)'}</span>
        </div>
      </div>
    )
  }

  render () {
    if (this.props.games.mine.length === 0) {
      return (
        <div className={s.root}>
          <Header fixed={false} home route={this.props.route}/>
          <div className={s.fakeunder}></div>
          <div className={s.container}>
            <div className={s.games}>
              <div className={s.nogamesdiv}>
                <span className={s.nogamestext}>You have not entered any games yet.</span>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      )
    }
    return (
      <div className={s.root}>
        <Header fixed={false} home route={this.props.route}/>
        <div className={s.fakeunder}></div>
        {this.renderAd()}
        <div className={s.container}>
          <div className={s.games}>
            <div className={s.candidatekey}>
              <span className={s.candidateKeyTitle}>YOUR PICK</span>
              <div className={s.fifty}/>
              <span className={s.candidateKeyTitle}>WINNER</span>
              <div className={s.fifty}/>
              <span className={s.candidateTitleMPE}>STATE</span>
              <span className={s.candidateKeyScore}>EARNINGS</span>
            </div>
            {this.renderMyGames()}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

  renderMyGames () {
    function n (n) {
      return n > 9 ? '' + n: '0' + n
    }
    if (this.props.games.mine.length > 0 && Object.keys(this.props.games.mappedItems).length > 0) {
      return this.props.games.mine.map(function (g, i) {
        var game = g.match
        var c = this.props.candidates.mappedItems.get(g.prediction)
        var p = Date.parse(game.checkdate)
        var winner = false
        var loser = false
        var wid = game.winners[0]
        var cw = this.props.candidates.mappedItems.get(wid)
        if (g.match.entries < g.match.minsize) {
          winner = false
          loser = false
        } else if (game.winners[0] === c._id) {
          winner = true
          loser = false
        } else {
          winner = false
          loser = true
        }
        if (this.state.time >= p) {
          if (winner) {
            return (
              <div key={'himom' + i} className={s.all}>
                <div key={c.name} className={s.candidateBoxBottom}>
                  <img src={c.img} className={s.candidateImage}/>
                  <span className={s.candidateBoxTitle}>{c.name}</span>
                  <img src={cw.img} className={s.candidateImage}/>
                  <span className={s.candidateBoxTitle}>{cw.name}</span>
                  <span className={s.candidateMoney}>{game.statename}</span>
                  <div className={s.rightdivvy}>
                    <span data-tip data-for={'winner' + i} className={s.win}>{'+ $' + (game.reward / game.winnercount).toFixed(2)}</span>
                  </div>
                </div>
                <ReactToolTip id={'winner' + i} place='left' type='success' effect='solid' multiline>
                  <span className={s.wintip}>A win! This money has been added<br/> back to your account balance.</span>
                </ReactToolTip>
              </div>
            )
          } else if (loser) {
            return (
              <div key={'himom' + i} className={s.all}>
                <div key={c.name} className={s.candidateBoxBottom}>
                  <img src={c.img} className={s.candidateImage}/>
                  <span className={s.candidateBoxTitle}>{c.name}</span>
                  <img src={cw.img} className={s.candidateImage}/>
                  <span className={s.candidateBoxTitle}>{cw.name}</span>
                  <span className={s.candidateMoney}>{game.statename}</span>
                  <div className={s.rightdivvy}>
                    <span data-tip data-for={'loser' + i} className={s.lose}>{'+ $ 0.00'}</span>
                  </div>
                </div>
                <ReactToolTip id={'loser' + i} place='left' type='error' effect='solid' multiline>
                  <span className={s.wintip}>Incorrect prediction. <br/>You made no money.</span>
                </ReactToolTip>
              </div>
            )
          } else {
            return (
              <div key={'himom' + i} className={s.all}>
                <div key={c.name} className={s.candidateBoxBottom}>
                  <img src={c.img} className={s.candidateImage}/>
                  <span className={s.candidateBoxTitle}>{c.name}</span>
                  <img src={cw.img} className={s.candidateImage}/>
                  <span className={s.candidateBoxTitle}>{cw.name}</span>
                  <span className={s.candidateMoney}>{game.statename}</span>
                  <div className={s.rightdivvy}>
                    <span data-tip data-for={'refund' + i} className={s.refund}>{'+ $' + g.match.entry.toFixed(2)}</span>
                  </div>
                </div>
                <ReactToolTip id={'refund' + i} place='left' type='warning' effect='solid' multiline>
                  <span className={s.wintip}>Game failed to fill. Entry fee has<br/>  been fully refunded.</span>
                </ReactToolTip>
              </div>
            )
          }
        }
        var to = this.convertMS(p - this.state.time)
        return (
          <div key={'himom' + i} className={s.all}>
            <div key={c.name} className={s.candidateBoxBottom}>
              <img src={c.img} className={s.candidateImage}/>
              <span className={s.candidateBoxTitle}>{c.name}</span>
              <span data-tip data-for={'time' + i} className={s.candidateBoxTitleBlank}>---</span>
              <div className={s.fakeimage}/>
              <span className={s.candidateMoney}>{game.statename}</span>
              <div className={s.rightdivvy}>
                <span data-tip data-for={'time' + i} className={s.candidateScore}>---</span>
              </div>
              <ReactToolTip id={'time' + i} place='left' type='dark' effect='solid' multiline>
                <span className={s.wintip}>Results will be posted in:<br/>{n(to.d) + ':' + n(to.h) + ':' + n(to.m) + ':' + n(to.s)}</span>
              </ReactToolTip>
            </div>
          </div>
        )
      }.bind(this))
    }
  }

  handleStats (id) {
    if (this.props.games.stats.total === 0) {
      return 0
    } else {
      if (Object.keys(this.props.games.immutablestats).length > 0) {
        if (this.props.games.immutablestats.has(id)) {
          return (this.props.games.immutablestats.get(id) / this.props.games.stats.total * 100).toFixed(2)
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  }

  handleMPE (id, g) {
    var game = this.props.games.mappedItems.get(g)
    if (this.props.games.stats.total === 0) {
      return game.reward
    } else {
      if (Object.keys(this.props.games.immutablestats).length > 0) {
        if (this.props.games.immutablestats.has(id)) {
          return game.reward / (this.props.games.immutablestats.get(id) + 1)
        } else {
          return game.reward
        }
      } else {
        return game.reward
      }
    }
  }

  convertMS (ms) {
    var d, h, m, s
    s = Math.floor(ms / 1000)
    m = Math.floor(s / 60)
    s = s % 60
    h = Math.floor(m / 60)
    m = m % 60
    d = Math.floor(h / 24)
    h = h % 24
    return { d: d, h: h, m: m, s: s }
  }

  abr (text) {
    if (text === 'Democratic') {
      return 'D'
    }
    return 'R'
  }
}

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(MyGames))
