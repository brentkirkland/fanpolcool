import { createAction, handleActions } from 'redux-actions'
import Immutable from 'immutable'
require('es6-promise').polyfill()
require('isomorphic-fetch')
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_CANDIDATES = 'REQUEST_CANDIDATES'
export const RECIEVE_CANDIDATES = 'RECIEVE_CANDIDATES'
export const INVALIDATE_CANDIDATES = 'INVALIDATE_CANDIDATES'
export const ADD_IMMUTABILITY_CANDIDATES = 'ADD_IMMUTABILITY_CANDIDATES'
export const ADD_IMMUTABILITY_NAMES = 'ADD_IMMUTABILITY_NAMES'
// ------------------------------------
// Actions
// ------------------------------------

export const invalidateCandidates = createAction(INVALIDATE_CANDIDATES)
const recieveCandidates = createAction(RECIEVE_CANDIDATES, (json = []) => json)
const requestCandidates = createAction(REQUEST_CANDIDATES)
const addImmutabilityCandidates = createAction(ADD_IMMUTABILITY_CANDIDATES, (x = []) => x)
const addImmutabilityNames = createAction(ADD_IMMUTABILITY_NAMES, (nn = {}) => nn)

function fetchCandidates () {
  return (dispatch) => {
    dispatch(requestCandidates())
    return fetch('https://api.fantasypollster.com/api/data/candidates')
      .then((response) => response.json())
      .then((json) => dispatch(makeImmutable(json)))
  }
}

function makeImmutable (json) {
  return (dispatch) => {
    dispatch(recieveCandidates(json))
    var y = {}
    var n = {}
    for (var i = 0; i < json.length; i++) {
      y[json[i]._id] = json[i]
      n[json[i].name] = json[i]._id
    }

    var x = Immutable.Map(y)
    var nn = Immutable.Map(n)
    dispatch(addImmutabilityCandidates(x))
    dispatch(addImmutabilityNames(nn))
  }
}

function shouldFetchCandidates (state) {
  const candidates = state.candidates
  if (!candidates) {
    return true
  }

  if (candidates.isFetching) {
    return false
  }

  if (candidates.didInvalidate) {
    return true
  }

  if (candidates.items.length < 1) {
    return true
  }

  return false
}

export const fetchCandidatesIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchCandidates(getState())) {
      return dispatch(fetchCandidates())
    }
  }
}

export const actions = {
  fetchCandidatesIfNeeded
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [INVALIDATE_CANDIDATES]: (state, action) => (Object.assign({}, state, {
    didInvalidate: true
  })),
  [RECIEVE_CANDIDATES]: (state, action) => (Object.assign({}, state, {
    items: action.payload,
    isFetching: false,
    didInvalidate: false
  })),
  [REQUEST_CANDIDATES]: (state, action) => (Object.assign({}, state, {
    isFetching: true,
    didInvalidate: false
  })),
  [ADD_IMMUTABILITY_CANDIDATES]: (state, action) => (Object.assign({}, state, {
    mappedItems: action.payload
  })),
  [ADD_IMMUTABILITY_NAMES]: (state, action) => (Object.assign({}, state, {
    mappedNames: action.payload
  }))
}, {didInvalidate: false, isFetching: false, items: [], mappedItems: [], mappedNames: {}})
