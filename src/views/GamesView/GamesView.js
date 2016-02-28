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
        this.context.router.push('/games/' + address)
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
        <div className={s.container}>
          <div className={s.game}>
            {this.renderGame()}
          </div>
        </div>
        <div className={s.container}>
          <div>
            <div className={s.games}>
              {this.renderProfileTab()}
              {this.renderColumns()}
              {this.mapGames()}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

  renderColumns () {
    if (this.props.containerWidth < 580) {
      return (
        <div key={'hidadtop'} className={s.gamecdiv}>
          <div className={s.partyDiv}>
            <span className={s.gamec}>PARTY</span>
          </div>
          <div className={s.gameStuff}>
            <span className={s.gamec}>STATE</span>
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
        <div className={s.partyDiv}>
          <span className={s.gamec}>PARTY</span>
        </div>
        <div className={s.gameStuff}>
          <span className={s.gamec}>STATE</span>
        </div>
        <div className={s.timeDiv}>
          <span className={s.gamec}>TIME REMAINING</span>
        </div>
        <div className={s.gameSize}>
          <span className={s.gamec}>GAME SIZE</span>
        </div>
        <div className={s.gameMoney2}>
          <span className={s.gamec}>TOTAL WINNINGS</span>
        </div>
        <div className={s.gameMoney}>
          <span className={s.gamec}>ENTRY</span>
        </div>
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
      return (
        <div className={s.title}>
          <div className={s.gameStuff}>
            <span className={s.gameName2}>Available Games</span>
          </div>
        </div>
      )
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
                <div className={s.partyDiv}>
                  <span className={s.gameName}>{this.abr(game.party)}</span>
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
              <div className={s.partyDiv}>
                <span className={s.gameName}>{this.abr(game.party)}</span>
              </div>
              <div className={s.gameStuff}>
                <span className={s.gameName}>{game.statename}</span>
              </div>
              <div className={s.timeDiv}>
                <span className={s.gameName}>{n(to.d) + ':' + n(to.h) + ':' + n(to.m) + ':' + n(to.s)}</span>
              </div>
              <div className={s.gameSize}>
                <span className={s.gameName}>{game.entries + '/' + game.maxsize}</span>
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
      } else {
        if (this.props.containerWidth < 580) {
          return (
            <Link key={'himom' + i} to={'/games/' + game._id}>
              <div key={'hidad' + i} className={s.gameRow}>
                <div className={s.partyDiv}>
                  <span className={s.gameName}>{this.abr(game.party)}</span>
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
            <div key={'hidad' + i} className={s.gameRow}>
              <div className={s.partyDiv}>
                <span className={s.gameName}>{this.abr(game.party)}</span>
              </div>
              <div className={s.gameStuff}>
                <span className={s.gameName}>{game.statename}</span>
              </div>
              <div className={s.timeDiv}>
                <span className={s.gameName}>{n(to.d) + ':' + n(to.h) + ':' + n(to.m) + ':' + n(to.s)}</span>
              </div>
              <div className={s.gameSize}>
                <span className={s.gameName}>{game.entries + '/' + game.maxsize}</span>
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
    }.bind(this))
  }
}

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(GamesView))
