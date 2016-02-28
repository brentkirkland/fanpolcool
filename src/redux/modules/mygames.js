import { createAction, handleActions } from 'redux-actions'
import Immutable from 'immutable'
require('es6-promise').polyfill()
require('isomorphic-fetch')

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_MY_GAMES = 'REQUEST_MY_GAMES'
export const RECIEVE_MY_GAMES = 'RECIEVE_MY_GAMES'
export const INVALIDATE_MY_GAMES = 'INVALIDATE_MY_GAMES'
export const ADD_IMMUTABILITY_MY_GAMES = 'ADD_IMMUTABILITY_MY_GAMES'
// ------------------------------------
// Actions
// ------------------------------------
export const ivalidateMyGames = createAction(INVALIDATE_MY_GAMES)
const recieveMyGames = createAction(RECIEVE_MY_GAMES, (json = {}) => json)
const requestMyGames = createAction(REQUEST_MY_GAMES)
const addImmutabilityMyGames = createAction(ADD_IMMUTABILITY_MY_GAMES, (x = {}) => x)

export const fetchMyGames = () => {
  return (dispatch) => {
    if (localStorage.getItem('userToken') !== null) {
      dispatch(requestMyGames())
      return fetch('https://api.fantasypollster.com/api/positions/mine', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        },
        method: 'GET',
        cache: false
      }).then((response) => response.json())
        .then((json) => dispatch(makeImmutable(json)))
    }
  }
}

function makeImmutable (json) {
  return (dispatch) => {
    dispatch(recieveMyGames(json))
    var y = {}
    for (var i = 0; i < json.length; i++) {
      y[json[i]._id] = json[i]
    }

    var x = Immutable.Map(y)
    dispatch(addImmutabilityMyGames(x))
    // var chains = []
    // var total_points = 0
    // for (var i = 0; i < json.length; i++) {
    //   var chain = json[i]
    //   var items = json[i].items
    //
    // }
  }
}

export const actions = {
  fetchMyGames
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [INVALIDATE_MY_GAMES]: (state, action) => (Object.assign({}, state, {
    didInvalidate: true
  })),
  [RECIEVE_MY_GAMES]: (state, action) => (Object.assign({}, state, {
    items: action.payload,
    isFetching: false,
    didInvalidate: false
  })),
  [REQUEST_MY_GAMES]: (state, action) => (Object.assign({}, state, {
    isFetching: true,
    didInvalidate: false
  })),
  [ADD_IMMUTABILITY_MY_GAMES]: (state, action) => (Object.assign({}, state, {
    mappedItems: action.payload
  }))
}, {items: [], didInvalidate: false, isFetching: false, mappedItems: {}, chains: {}})
