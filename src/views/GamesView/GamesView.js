import React from 'react'
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as gamesActions } from '../../redux/modules/games'
import { actions as candidatesActions } from '../../redux/modules/candidates'
import { actions as mygamesActions } from '../../redux/modules/mygames'
import { actions as profileActions } from '../../redux/modules/profile'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import s from './GamesView.scss'
import Dimensions from 'react-dimensions'
import ReactToolTip from 'react-tooltip'

const mapStateToProps = (state) => ({
  games: state.games,
  mygames: state.mygames,
  profile: state.profile,
  candidates: state.candidates,
  stateRouter: state.router
})

const mapDispatchToProps = (dispatch) => ({
  gamesActions: bindActionCreators(gamesActions, dispatch),
  mygamesActions: bindActionCreators(mygamesActions, dispatch),
  profileActions: bindActionCreators(profileActions, dispatch),
  candidatesActions: bindActionCreators(candidatesActions, dispatch)
})

export class GamesView extends React.Component {

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
    candidatesActions: React.PropTypes.object.isRequired,
    stateRouter: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    if (this.props.route.path === '/games/:id') {
      // if (Object.keys(this.props.profile.profile).length === 0) {
      //   this.context.router.push('/games')
      // }

      if (this.props.profile.idToken === null || this.props.profile.idToken === '') {
        this.context.router.push('/games')
        // this.props.profile.lock.show({
        //   icon: 'https://s3-us-west-2.amazonaws.com/static-assets-fanpol/sadcyclops.png',
        //   primaryColor: '#5c666f',
        //   socialBigButtons: true,
        //   callbackURL: 'https://fantasypollster.com/games',
        //   responseType: 'token'})
      }
    }
    this.props.gamesActions.forceFetchGames()
    this.props.candidatesActions.fetchCandidatesIfNeeded()
    this.props.mygamesActions.fetchMyGames()
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this).scrollIntoView()
    this.timer = setInterval(() => {
      this.setState({time: Date.now()})
    }, 1000)
  }

  componentDidUpdate () {
    if (!this.props.profile.verified) {
      this.context.router.push('/accept')
    }
    if (this.props.stateRouter.locationBeforeTransitions.hash !== '') {
      var address = this.props.stateRouter.locationBeforeTransitions.hash.split('state=')[1]
      if (this.props.profile.idToken !== null && this.props.profile.idToken !== '') {
        if (address === undefined) {
          this.context.router.push('/games/')
        } else {
          this.context.router.push('/games/' + address)
        }
      }
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    return (
      <div className={s.root}>
        <Header fixed={false} home route={this.props.route}/>
        {this.renderAbout()}
        {this.renderAd()}
        <div className={s.container}>
          <div>
            {this.renderProfileTab()}
            {this.renderColumns()}
            <div className={s.games}>
              {this.mapGames()}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

  renderAbout () {
    return (
      <div className={s.root444}>
        <div className={s.container22}>
          <span className={s.adtext}>{'Fantasy Pollster brings Daily Fantasy Sports to the US presidential election. It\'s simple: pick a game below, select which candidate you think will win, and, if you are correct, you will receive a cash prize.'}</span>
        </div>
      </div>
    )
  }

  renderAd () {
    return (
      <div className={s.root4}>
        <div className={s.container22}>
          <span className={s.adtextgame}>{'GAMES'}</span>
          <span className={s.adtext}>{'| Select a game to play'}</span>
        </div>
      </div>
    )
  }

  renderColumns () {
    if (this.props.games.items.length === 0) {
      return (
        <div className={s.nogamesdiv}>
          <span className={s.nogamestext}>Sorry, no games at the moment.</span>
        </div>
      )
    }
    if (this.props.containerWidth < 580) {
      return (
        <div key={'hidadtop'} className={s.gamecdiv}>
          <div className={s.partyDivNoCircle}>
            <span className={s.gamec}>GAME</span>
          </div>
          <div className={s.gameStuff}>
            <span className={s.gamec}></span>
          </div>
          <div className={s.gameMoney2}>
            <span className={s.gamec}>WINNINGS</span>
          </div>
          <div className={s.gameMoney}>
            <span className={s.gamec}>ENTRY</span>
          </div>
        </div>
      )
    }
    return (
      <div key={'hidadtop'} className={s.gamecdiv}>
        <div className={s.partyDivNoCircle}>
          <span className={s.gamec}>GAME</span>
        </div>
        <div className={s.gameStuff}>
          <span className={s.gamec}></span>
        </div>
        <div className={s.timeDiv}>
          <span data-tip data-for='time' className={s.gamec}>TIME REMAINING</span>
        </div>
        <div className={s.gameSize}>
          <span data-tip data-for='size' className={s.gamec}>GAME SIZE</span>
        </div>
        <div className={s.gameMoney2}>
          <span data-tip data-for='winnings' className={s.gamec}>TOTAL WINNINGS</span>
        </div>
        <div className={s.gameMoney}>
          <span data-tip data-for='entry' className={s.gamec}>ENTRY</span>
        </div>
        <ReactToolTip id='time' place='left' type='info' effect='solid' multiline>
          <span className={s.wintip}>The time remaining<br/> before each game close.</span>
        </ReactToolTip>
        <ReactToolTip id='size' place='left' type='info' effect='solid' multiline>
          <span className={s.wintip}>The amount of players <br/> currently in each game.</span>
        </ReactToolTip>
        <ReactToolTip id='winnings' place='left' type='info' effect='solid' multiline>
          <span className={s.wintip}>The total amount of money <br/> split between first place.</span>
        </ReactToolTip>
        <ReactToolTip id='entry' place='left' type='info' effect='solid' multiline>
          <span className={s.wintip}>The cost of joining<br/> each game.</span>
        </ReactToolTip>
      </div>
    )
  }

  mapCandidates () {
    var game = this.props.games.mappedItems.get(this.props.routeParams.id)
    return game.candidates.map(function (candidate, i) {
      var c = this.props.candidates.mappedItems.get(candidate)
      if (i === game.candidates.length - 1) {
        return (
          <div className={s.candidateBoxBottom}>
            <img src={c.img} className={s.candidateImage}/>
            <span className={s.candidateBoxTitle}>{c.name}</span>
            <span className={s.candidateScore}>{'19'}</span>
          </div>
        )
      }
      return (
        <div className={s.candidateBox}>
          <img src={c.img} className={s.candidateImage}/>
          <span className={s.candidateBoxTitle}>{c.name}</span>
          <span className={s.candidateScore}>{'19'}</span>
        </div>
      )
    }.bind(this))
  }

  renderProfileTab () {
    if (this.props.route.path === '/games') {
    } else {
      return (
        <Link to={'/games/'}>
          <div className={s.title}>
            <div className={s.gameStuff}>
              <span className={s.gameName2}>Other Available Games</span>
            </div>
          </div>
        </Link>
      )
    }
  }

  renderGame () {
    // no game selected
    if (this.props.route.path === '/games') {
      return
    } else {
      return (
        <div className={s.gameDiv}>
          <div className={s.top3}>
            <span className={s.gameTitle}>{'Who will win ' + this.props.games.mappedItems.get(this.props.routeParams.id).statename + '?'}</span>
            <div className={s.submit}>
              <span className={s.submitText}>{'SUBMIT'}</span>
            </div>
          </div>
        </div>
      )
    }
  }

  renderCandidateBoxes () {
    return (
      <div className={s.candidateBox}>
        <span className={s.candidateBoxTitle}>{'Bernie Sanders'}</span>
      </div>
    )
  }

  abr (text) {
    if (text === 'Democratic') {
      return 'D'
    } if (text === 'Both') {
      return 'B'
    }
    return 'R'
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

  renderCircle (party) {
    if (party === 'Democratic') {
      return s.partyDivBlue
    } else if (party === 'Both') {
      return s.partyDivBlack
    }
    return s.partyDivRed
  }

  mapGames () {
    return this.props.games.items.map(function (game, i, a) {
      var to = this.convertMS(Date.parse(game.closedate) - this.state.time)
      function n (n) {
        return n > 9 ? '' + n: '0' + n
      }
      if (this.props.routeParams.id === game._id) {
        return
      } else if (i === a.length - 1) {
        if (this.props.containerWidth < 580) {
          return (
            <Link key={'himom' + i} to={'/games/' + game._id}>
              <div key={'hidad' + i} className={s.gameRowBottom}>
                <div className={this.renderCircle(game.party)}>
                  <span className={s.gameNameLight}>{this.abr(game.party)}</span>
                </div>
                <div className={s.gameStuff}>
                  <span className={s.gameName}>{game.statename}</span>
                </div>
                <div className={s.gameMoney2}>
                  <span className={s.gameName}>{'$' + game.reward}</span>
                </div>
                <div className={s.gameMoney}>
                  <span className={s.gameName}>{'$' + game.entry}</span>
                </div>
              </div>
            </Link>
          )
        }
        return (
          <Link key={'himom' + i} to={'/games/' + game._id}>
            <div key={'hidad' + i} className={s.gameRowBottom}>
              <div className={this.renderCircle(game.party)}>
                <span className={s.gameNameLight}>{this.abr(game.party)}</span>
              </div>
              <div className={s.gameStuff}>
                <span className={s.gameName}>{game.statename}</span>
              </div>
              <div className={s.timeDiv}>
                <span className={s.gameNameLight}>{n(to.d) + ':' + n(to.h) + ':' + n(to.m) + ':' + n(to.s)}</span>
              </div>
              <div className={s.gameSize}>
                <span className={s.gameNameLight}>{game.entries + '/' + game.maxsize}</span>
              </div>
              <div className={s.gameMoney2}>
                <span className={s.gameNameLight}>{'$' + game.reward}</span>
              </div>
              <div className={s.gameMoney}>
                <span className={s.gameNameLight}>{'$' + game.entry}</span>
              </div>
            </div>
          </Link>
        )
      } else {
        if (this.props.containerWidth < 580) {
          return (
            <Link key={'himom' + i} to={'/games/' + game._id}>
              <div key={'hidad' + i} className={s.gameRow}>
                <div className={this.renderCircle(game.party)}>
                  <span className={s.gameNameLight}>{this.abr(game.party)}</span>
                </div>
                <div className={s.gameStuff}>
                  <span className={s.gameName}>{game.statename}</span>
                </div>
                <div className={s.gameMoney2}>
                  <span className={s.gameNameLight}>{'$' + game.reward}</span>
                </div>
                <div className={s.gameMoney}>
                  <span className={s.gameNameLight}>{'$' + game.entry}</span>
                </div>
              </div>
            </Link>
          )
        }
        return (
          <Link key={'himom' + i} to={'/games/' + game._id}>
            <div key={'hidad' + i} className={s.gameRow}>
              <div className={this.renderCircle(game.party)}>
                <span className={s.gameNameLight}>{this.abr(game.party)}</span>
              </div>
              <div className={s.gameStuff}>
                <span className={s.gameName}>{game.statename}</span>
              </div>
              <div className={s.timeDiv}>
                <span className={s.gameNameLight}>{n(to.d) + ':' + n(to.h) + ':' + n(to.m) + ':' + n(to.s)}</span>
              </div>
              <div className={s.gameSize}>
                <span className={s.gameNameLight}>{game.entries + '/' + game.maxsize}</span>
              </div>
              <div className={s.gameMoney2}>
                <span className={s.gameNameLight}>{'$' + game.reward}</span>
              </div>
              <div className={s.gameMoney}>
                <span className={s.gameNameLight}>{'$' + game.entry}</span>
              </div>
            </div>
          </Link>
        )
      }
    }.bind(this))
  }
}

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(GamesView))
