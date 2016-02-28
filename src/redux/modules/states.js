import { createAction, handleActions } from 'redux-actions'
import Immutable from 'immutable'
require('es6-promise').polyfill()
require('isomorphic-fetch')
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_STATES = 'REQUEST_STATES'
export const RECIEVE_STATES = 'RECIEVE_STATES'
export const INVALIDATE_STATES = 'INVALIDATE_STATES'
export const ADD_IMMUTABILITY_STATES = 'ADD_IMMUTABILITY_STATES'
export const ADD_IMMUTABILITY_STATE_NAMES = 'ADD_IMMUTABILITY_STATE_NAMES'
// ------------------------------------
// Actions
// ------------------------------------

export const invalidateStates = createAction(INVALIDATE_STATES)
const recieveStates = createAction(RECIEVE_STATES, (json = []) => json)
const requestStates = createAction(REQUEST_STATES)
const addImmutabilityStates = createAction(ADD_IMMUTABILITY_STATES, (x = []) => x)
const addImmutabilityStateNames = createAction(ADD_IMMUTABILITY_STATE_NAMES, (nn = {}) => nn)

function fetchStates () {
  return (dispatch) => {
    dispatch(requestStates())
    return fetch('https://api.fantasypollster.com/api/data/states')
      .then((response) => response.json())
      .then((json) => dispatch(makeImmutable(json)))
  }
}

function makeImmutable (json) {
  return (dispatch) => {
    dispatch(recieveStates(json))
    var y = {}
    var n = {}
    for (var i = 0; i < json.length; i++) {
      y[json[i]._id] = json[i]
      n[json[i].name] = json[i]._id
    }

    var x = Immutable.Map(y)
    var nn = Immutable.Map(n)
    dispatch(addImmutabilityStates(x))
    dispatch(addImmutabilityStateNames(nn))
  }
}

function shouldFetchStates (state) {
  const states = state.states
  if (!states) {
    return true
  }
  if (states.isFetching) {
    return false
  }
  if (states.didInvalidate) {
    return true
  }

  if (states.items.length < 1) {
    return true
  }

  return false
}

export const fetchStatesIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchStates(getState())) {
      return dispatch(fetchStates())
    }
  }
}

export const actions = {
  fetchStatesIfNeeded
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [INVALIDATE_STATES]: (state, action) => (Object.assign({}, state, {
    didInvalidate: true
  })),
  [RECIEVE_STATES]: (state, action) => (Object.assign({}, state, {
    items: action.payload,
    isFetching: false,
    didInvalidate: false
  })),
  [REQUEST_STATES]: (state, action) => (Object.assign({}, state, {
    isFetching: true,
    didInvalidate: false
  })),
  [ADD_IMMUTABILITY_STATES]: (state, action) => (Object.assign({}, state, {
    mappedItems: action.payload
  })),
  [ADD_IMMUTABILITY_STATE_NAMES]: (state, action) => (Object.assign({}, state, {
    mappedNames: action.payload
  }))
}, {didInvalidate: false, isFetching: false, items: [], mappedItems: [], mappedNames: []})
