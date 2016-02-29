/* @flow */
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
import s from './MyGames.scss'
import Dimensions from 'react-dimensions'

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
    if (localStorage.getItem('userToken') === null) {
      this.context.router.push('/games')
    }
    this.timer = setInterval(() => {
      this.setState({time: Date.now()})
    }, 1000)
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    return (
      <div className={s.root}>
        <Header fixed={false} home route={this.props.route}/>
        <div className={s.fakeunder}></div>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.gameStuff}>
              <Link to='/games'><span className={s.gameName2}>Available Games</span></Link>
              <span className={s.gameName3}>My Games</span>
            </div>
          </div>
          <div className={s.games}>
            <div className={s.candidatekey}>
              <span className={s.candidateKeyTitle}>CANDIDATE</span>
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
        var to = this.convertMS(Date.parse(game.checkdate) - this.state.time)
        return (
          <div key={'himom' + i} className={s.all}>
            <div key={c.name} className={s.candidateBoxBottom}>
              <img src={c.img} className={s.candidateImage}/>
              <span className={s.candidateBoxTitle}>{c.name}</span>
              <span className={s.candidateMoney}>{game.statename}</span>
              <span className={s.candidateScore}>{n(to.d) + ':' + n(to.h) + ':' + n(to.m) + ':' + n(to.s)}</span>
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
