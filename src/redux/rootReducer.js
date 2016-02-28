import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import games from './modules/games'
import mygames from './modules/mygames'
import game from './modules/game'
import states from './modules/states'
import candidates from './modules/candidates'
import profile from './modules/profile'

export default combineReducers({
  counter,
  games,
  states,
  candidates,
  game,
  router,
  mygames,
  profile
})
