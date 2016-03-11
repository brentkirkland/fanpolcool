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
import s from './GameView.scss'
import Dimensions from 'react-dimensions'
import ReactToolTip from 'react-tooltip'

const mapStateToProps = (state) => ({
  games: state.games,
  mygames: state.mygames,
  profile: state.profile,
  candidates: state.candidates,
  router: state.router
})

const mapDispatchToProps = (dispatch) => ({
  gamesActions: bindActionCreators(gamesActions, dispatch),
  mygamesActions: bindActionCreators(mygamesActions, dispatch),
  profileActions: bindActionCreators(profileActions, dispatch),
  candidatesActions: bindActionCreators(candidatesActions, dispatch)
})

export class GameView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      candidate: '',
      candidateid: '',
      submit: false,
      time: Date.now()
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.actuallySubmit = this.actuallySubmit.bind(this)
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    containerWidth: React.PropTypes.number.isRequired,
    games: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
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
    // if (Object.keys(this.props.profile.profile).length === 0) {
    //   this.context.router.push('/games')
    // }
      // this.props.profile.lock.show({
      //   icon: 'https://s3-us-west-2.amazonaws.com/static-assets-fanpol/sadcyclops.png',
      //   primaryColor: '#5c666f',
      //   socialBigButtons: true,
      //   callbackURL: 'https://fantasypollster.com/games',
      //   responseType: 'token'})
    this.props.gamesActions.fetchGamesIfNeeded()
    this.props.candidatesActions.fetchCandidatesIfNeeded()
    // this.props.gamesActions.getStats(this.props.routeParams.id)
  }

  componentDidMount () {
    // this.props.gamesActions.getStats(this.props.routeParams.id)
    ReactDOM.findDOMNode(this).scrollIntoView()
    this.timer = setInterval(() => {
      this.setState({time: Date.now()})
    }, 1000)
    this.timer2 = setInterval(() => {
      this.props.gamesActions.getStats(this.props.routeParams.id)
    }, 10000)
  }

  componentWillUnmount () {
    this.props.gamesActions.clearStats()
    clearTimeout(this.timer)
    clearTimeout(this.timer2)
  }

  componentDidUpdate () {
    if (!this.props.games.mappedItems.has('bk123') && !this.props.games.mappedItems.has(this.props.routeParams.id)) {
      this.context.router.push('/games')
    }
    if (!this.props.profile.verified) {
      this.context.router.push('/accept#state=' + this.props.routeParams.id)
    }

    if (this.props.candidates.items.length > 0 && Object.keys(this.props.games.stats).length === 0) {
      this.props.gamesActions.getStats(this.props.routeParams.id)
    }

    // if (this.props.games.items.length > 0 && Object.keys(this.props.games.stats).length > 0) {
    //   if (this.props.games.mappedItems.get(this.props.routeParams.id).maxsize <= this.props.games.stats.total ) {
    //     this.context.router.push('/games')
    //   }
    // }
  }

  render () {
    if (this.props.games.mappedItems.has('bk123')) {
      return (
        <div className={s.root}>
          <Header fixed={false} route={this.props.route}/>
          <Header fixed route={this.props.route}/>
          <div className={s.container}>
            <h1>Loading</h1>
          </div>
          <Footer/>
        </div>
      )
    } else if (!this.props.games.mappedItems.has(this.props.routeParams.id)) {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <h3>Sorry, wrong url or game reached capacity</h3>
            <h1>Game not Found</h1>
          </div>
        </div>
      )
    } else {
      return (
        <div className={s.root}>
          <Header fixed={false} home route={this.props.route}/>
          <div className={s.fakeunder}></div>
          {this.renderAd()}
          {this.renderSelectedGame()}
          <div className={s.container}>
            <div className={s.game}>
              {this.renderGame()}
            </div>
          </div>
          {this.renderSelectComponent()}

          <Footer/>
        </div>
      )
    }
  }

  renderAd () {
    var game = this.props.games.mappedItems.get(this.props.routeParams.id)
    if (this.props.router.locationBeforeTransitions.hash === '#social') {
      if (game.party === 'Republican') {
        return (
          <div className={s.root4r}>
            <div className={s.container23}>
              <span className={s.adtext}>{'WIN UP TO $' + game.reward}</span>
              <span className={s.adtext2}>{'after entering this game for $' + game.entry + '.'}</span>
            </div>
          </div>
        )
      } else if (game.party === 'Both') {
        return (
          <div className={s.root4b}>
            <div className={s.container23}>
              <span className={s.adtext}>{'WIN UP TO $' + game.reward}</span>
              <span className={s.adtext2}>{'after entering this game for $' + game.entry + '.'}</span>
            </div>
          </div>
        )
      } else {
        return (
          <div className={s.root4d}>
            <div className={s.container23}>
              <span className={s.adtext}>{'WIN UP TO $' + game.reward}</span>
              <span className={s.adtext2}>{'after entering this game for $' + game.entry + '.'}</span>
            </div>
          </div>
        )
      }
    } else {
      if (this.state.submit) {
        return (
          <div className={s.root44}>
            <div className={s.container22}>
              <span className={s.gamenametop}>{game.name}</span>
              <div>
                <span className={s.adtext3O}>{this.handleMobile()}</span>
                <span className={s.adtext3O}>{'2. Enter'}</span>
                <span className={s.adtext3}>{'3. Confirm'}</span>
              </div>
            </div>
          </div>
        )
      } else if (this.state.candidate !== '') {
        return (
          <div className={s.root44}>
            <div className={s.container22}>
              <span className={s.gamenametop}>{game.name}</span>
              <div>
                <span className={s.adtext3O}>{this.handleMobile()}</span>
                <span className={s.adtext3}>{'2. Enter'}</span>
                <span className={s.adtext3O}>{'3. Confirm'}</span>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className={s.root44}>
            <div className={s.container22}>
              <span className={s.gamenametop}>{game.name}</span>
              <div>
                <span className={s.adtext3}>{this.handleMobile()}</span>
                <span className={s.adtext3O}>{'2. Enter'}</span>
                <span className={s.adtext3O}>{'3. Confirm'}</span>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  handleMobile () {
    if (this.props.containerWidth < 580) {
      return '1. Predict a candidate'
    } else {
      return '| 1. Predict a candidate'
    }
  }

  renderStats (state) {
    if (state === 'General Election') {
      return 'state'
    } else {
      return 'precinct'
    }
  }

  renderSelectComponent () {
    if (this.props.route.path !== '/games') {
      var state = this.props.games.mappedItems.get(this.props.routeParams.id).statename
      return (
        <div className={s.root3}>
          <div className={s.container3}>
            <div className={s.candidatekey}>
              <span className={s.candidateKeyTitle}>CANDIDATE</span>
              <div className={s.fifty}/>
              <span data-tip data-for='earnings' className={s.candidateTitleMPE}>{this.handleLengthString()}</span>
              <span data-tip data-for='percent' className={s.candidateKeyScore}>{this.handlePercentageLength()}</span>
            </div>
            <ReactToolTip id='earnings' place='left' type='info' effect='solid' multiline>
              <span className={s.wintip}>The max amount of money you can <br/>currently win for each candidate.</span>
            </ReactToolTip>
            <ReactToolTip id='percent' place='left' type='info' effect='solid' multiline>
              <span className={s.wintip}>The percentage of people who <br/>  have picked each candidate.</span>
            </ReactToolTip>
            {this.mapCandidates()}
          </div>
          <div className={s.container44}>
            <span className={s.gameTitle}>How it Works</span>
          </div>
          <div className={s.container4}>
            <span className={s.gameOutcomeBold}>How is a win determined?</span>
            <span className={s.gameOutcome}>{'The outcome is determined by the accumulated results of the polls taken in each individual ' + this.renderStats(state) + ' of ' + this.renderWho(state) + '. Results will be posted after each ' + this.renderStats(state) + ' of ' + this.renderWho(state) + ' has accounted every vote.'}</span>
          </div>
          <div className={s.container4}>
            <span className={s.gameOutcomeBold}>{'What is Max Earnings?'}</span>
            <span className={s.gameOutcome}>{'Max Earnings represents the current maximum that one can possibly earn from choosing a given candidate. This metric changes based on the Percentage of each candidate.'}</span>
          </div>
          <div className={s.container4}>
            <span className={s.gameOutcomeBold}>{'What is Percentage?'}</span>
            <span className={s.gameOutcome}>{'Percentage is the proportion of players in this game who have chosen a given candidate.'}</span>
          </div>
          <div className={s.container4}>
            <span className={s.gameOutcomeBold}>{'What is Total Winnings?'}</span>
            <span className={s.gameOutcome}>{'Total Winnings is the grand prize. It is split between the players who make the correct prediction.'}</span>
          </div>
          <div className={s.container4}>
            <span className={s.gameOutcomeBold}>What happens if a game does not fill?</span>
            <span className={s.gameOutcome}>{'If a game does not fill, your entry fee of $'+ this.props.games.mappedItems.get(this.props.routeParams.id).entry + ' will be refunded.'}</span>
          </div>
          <div className={s.container4}>
            <span className={s.gameOutcomeBold}>What happens if everyone picks the same candidate?</span>
            <span className={s.gameOutcome}>{'We will add an additional $'+ this.props.games.mappedItems.get(this.props.routeParams.id).entry + ' to the total winnings. That way you recieve your entry fee back and don\'t lose money.'}</span>
          </div>
          <div className={s.container4}>
            <span className={s.gameOutcomeBold}>When do you charge me for entry?</span>
            <span className={s.gameOutcome}>{'You will be charged for entry after you submit.'}</span>
          </div>

        </div>
      )
    }
    return
  }

  handleLengthString () {
    if (this.props.containerWidth < 700) {
      return 'MAX WIN'
    } else {
      return 'MAX EARNINGS'
    }
  }

  handlePercentageLength () {
    if (this.props.containerWidth < 600) {
      return '%'
    } else {
      return 'PERCENTAGE'
    }
  }

  mapCandidates () {
    var game = this.props.games.mappedItems.get(this.props.routeParams.id)
    if (this.props.candidates.mappedItems.size > 0) {
      return game.candidates.map(function (candidate, i) {
        var c = this.props.candidates.mappedItems.get(candidate)
        var name
        var id
        if (i === game.candidates.length - 1) {
          name = c.name
          id = c._id
          if (this.state.candidate === name) {
            return (
              <div key={c.name + 'dark'} className={s.candidateBoxDark} onClick={this.handleChoice.bind(this, name, id)}>
                <img src={c.img} className={s.candidateImage}/>
                <span className={s.candidateBoxTitle}>{c.name}</span>
                <span className={s.candidateMoney}>{'$' + this.handleMPE(id).toFixed(2)}</span>
                <span className={s.candidateScore}>{this.handleStats(id) + '%'}</span>
              </div>
            )
          }
          return (
            <div key={c.name} className={s.candidateBox} onClick={this.handleChoice.bind(this, name, id)}>
              <img src={c.img} className={s.candidateImage}/>
              <span className={s.candidateBoxTitle}>{c.name}</span>
              <span className={s.candidateMoney}>{'$' + this.handleMPE(id).toFixed(2)}</span>
              <span className={s.candidateScore}>{this.handleStats(id) + '%'}</span>
            </div>
          )
        }
        name = c.name
        id = c._id
        if (this.state.candidate === name) {
          return (
            <div key={c.name + 'dark'} className={s.candidateBoxDark} onClick={this.handleChoice.bind(this, name, id)}>
              <img src={c.img} className={s.candidateImage}/>
              <span className={s.candidateBoxTitle}>{c.name}</span>
              <span className={s.candidateMoney}>{'$' + this.handleMPE(id).toFixed(2)}</span>
              <span className={s.candidateScore}>{this.handleStats(id) + '%'}</span>
            </div>
          )
        }
        return (
          <div key={c.name} className={s.candidateBox} onClick={this.handleChoice.bind(this, name, id)}>
            <img src={c.img} className={s.candidateImage}/>
            <span className={s.candidateBoxTitle}>{c.name}</span>
            <span className={s.candidateMoney}>{'$' + this.handleMPE(id).toFixed(2)}</span>
            <span className={s.candidateScore}>{this.handleStats(id) + '%'}</span>
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

  handleMPE (id) {
    var game = this.props.games.mappedItems.get(this.props.routeParams.id)
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

  handleChoice = function (name, id) {
    var game = this.props.games.mappedItems.get(this.props.routeParams.id)
    if (this.props.profile.idToken === null || this.props.profile.idToken === '') {
      this.props.profile.lock.show({
        icon: 'https://s3-us-west-2.amazonaws.com/static-assets-fanpol/sadcyclops.png',
        primaryColor: '#5c666f',
        socialBigButtons: true,
        authParams: {
          state: this.props.routeParams.id
        },
        callbackURL: 'https://fantasypollster.com/games',
        responseType: 'token'})
    } else if (game.entry > this.props.profile.balance) {
      this.context.router.push('/points#state=' + this.props.routeParams.id)
    } else {
      this.setState({candidate: name, candidateid: id, submit: false})
    }
  }

  renderSelectedGame () {
    function n (n) {
      return n > 9 ? '' + n: '0' + n
    }
    if (this.props.route.path !== '/games') {
      var game = this.props.games.mappedItems.get(this.props.routeParams.id)
      if (game) {
        var to = this.convertMS(Date.parse(game.closedate) - this.state.time)
        return (
          <div className={s.gameRowColor2}>
            <div className={s.container2}>
              <div className={s.gameinfobottom}>
                <div className={s.timeDiv}>
                  <span className={s.gameUnderText}>Time Remaining</span>
                  <span className={s.gameName}>{n(to.d) + ':' + n(to.h) + ':' + n(to.m) + ':' + n(to.s)}</span>
                </div>
                <div className={s.gameSize}>
                  <span className={s.gameUnderText}>Game Size</span>
                  <span className={s.gameName}>{(game.maxsize - this.handleSize(game.entries)) + ' Remaining Slots'}</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  handleSize (entries) {
    if (Object.keys(this.props.games.stats).length === 0) {
      return entries
    } else {
      return this.props.games.stats.total
    }
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
        <div className={s.title}>
          <div className={s.gameStuff}>
            <span className={s.gameName2}>Other Available Games</span>
          </div>
        </div>
      )
    }
  }

  renderWho (state) {
    if (state === 'General Election') {
      return 'the General Election'
    } else {
      return state
    }
  }

  renderGame () {
    // no game selected
    if (this.props.route.path === '/games') {
      return
    } else {
      if (this.state.candidate === '') {
        return (
          <div className={s.gameDiv}>
            <div className={s.top3}>
              <div className={s.gametitlediv}>
                <span className={s.gameTitle}>{'Who will win ' + this.renderWho(this.props.games.mappedItems.get(this.props.routeParams.id).statename) + '?'}</span>
              </div>
              <div className={s.submitOpac}>
                <span className={s.submitText}>{'ENTER'}</span>
              </div>
              <div className={s.submitOpacW}>
                <span className={s.submitText}>{'$1'}</span>
              </div>
            </div>
          </div>
        )
      }
      if (this.state.submit) {
        return (
          <div className={s.gameDiv}>
            <div className={s.top3}>
              <span className={s.gameTitle}><b>{this.state.candidate}</b>{' will win ' + this.renderWho(this.props.games.mappedItems.get(this.props.routeParams.id).statename) + '.'}</span>
              <div className={s.submitConfirm} onClick={this.actuallySubmit}>
                <span className={s.submitText}>{'CONFIRM'}</span>
              </div>
              <div className={s.submitConfirmW} onClick={this.actuallySubmit}>
                <span className={s.submitText}>{'$1'}</span>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className={s.gameDiv}>
          <div className={s.top3}>
            <span className={s.gameTitle}><b>{this.state.candidate}</b>{' will win ' + this.props.games.mappedItems.get(this.props.routeParams.id).statename + '.'}</span>
            <div className={s.submit} onClick={this.handleSubmit}>
              <span className={s.submitText}>{'ENTER'}</span>
            </div>
            <div className={s.submitW} onClick={this.handleSubmit}>
              <span className={s.submitText}>{'$1'}</span>
            </div>
          </div>
        </div>
      )
    }
  }

  actuallySubmit () {
    this.props.gamesActions.submitGame(this.state.candidateid, this.props.routeParams.id)
    this.context.router.push('/games/mine')
  }

  handleSubmit () {
    var game = this.props.games.mappedItems.get(this.props.routeParams.id)
    if (this.props.profile.idToken === null || this.props.profile.idToken === '') {
      this.props.profile.lock.show({
        icon: 'https://s3-us-west-2.amazonaws.com/static-assets-fanpol/sadcyclops.png',
        primaryColor: '#5c666f',
        socialBigButtons: true,
        authParams: {
          state: this.props.routeParams.id
        },
        callbackURL: 'https://fantasypollster.com/games',
        responseType: 'token'})
    } else if (game.entry > this.props.profile.balance) {
      this.context.router.push('/points#state=' + this.props.routeParams.id)
    } else {
      this.setState({submit: true})
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
    } else if (text === 'Republican') {
      return 'DRED'
    }
    return 'DRED'
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
    function n (n) {
      return n > 9 ? '' + n: '0' + n
    }
    return this.props.games.items.map(function (game, i, a) {
      var to = this.convertMS(Date.parse(game.closedate) - this.state.time)
      if (this.props.routeParams.id === game._id) {
        return
      } else if (i > 3) {
        return
      } else if (i === 3) {
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
          <Link key={'himom' + i} to={'/games/' + game._id} onClick={this.handleOtherGame.bind(this)}>
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
          <Link key={'himom' + i} to={'/games/' + game._id} onClick={this.handleOtherGame.bind(this)}>
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

  handleOtherGame () {
    this.setState({candidate: ''})
  }
}

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(GameView))
