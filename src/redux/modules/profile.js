import { createAction, handleActions } from 'redux-actions'
require('es6-promise').polyfill()
require('isomorphic-fetch')
import Auth0Lock from 'auth0-lock'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_TOKEN = 'SET_TOKEN'
export const SET_PROFILE = 'SET_PROFILE'
export const SET_LOCK = 'SET_LOCK'
export const SET_ERROR = 'SET_ERROR'
export const REMOVE_DATA = 'REMOVE_DATA'
export const BALANCE = 'BALANCE'
export const IS_FETCHING_BALANCE = 'IS_FETCHING_BALANCE'
export const NOT_VERIFIED = 'NOT_VERIFIED'
export const VERIFY = 'VERIFY'
// ------------------------------------
// Actions
// ------------------------------------
const setToken = createAction(SET_TOKEN, (token = '') => token)
const setProfile = createAction(SET_PROFILE, (profile = null) => profile)
const setLock = createAction(SET_LOCK, (lock = {}) => lock)
const setError = createAction(SET_ERROR, (error = null) => error)
const removeData = createAction(REMOVE_DATA)
const balance = createAction(BALANCE, (foos = 0) => foos)
const isFetchingBalance = createAction(IS_FETCHING_BALANCE)
const notverified = createAction(NOT_VERIFIED)
const verify = createAction(VERIFY)

function getIdToken (lock) {
  var idToken = localStorage.getItem('userToken')
  var authHash = lock.parseHash(window.location.hash)
  if (!idToken && authHash) {
    if (authHash.id_token) {
      idToken = authHash.id_token
      localStorage.setItem('userTokenExp', authHash.profile.exp)
      localStorage.setItem('userToken', authHash.id_token)
    }
    if (authHash.error) {
      console.log('Error signing in', authHash)
      return null
    }
  }
  return idToken
}

export const createLock = (profile) => {
  return (dispatch) => {
    var token
    if (Object.keys(profile.lock).length === 0) {
      var lock = new Auth0Lock('DkLi16FetBtYAAHblf2AG1CS7tsA8vAd', 'fantasypollster.auth0.com')
      dispatch(setLock(lock))
      token = getIdToken(lock)
      dispatch(setToken(token))
    } else {
      token = getIdToken(profile.lock)
      dispatch(setToken(token))
    }
  }
}

export const getProfile = (profile) => {
  return (dispatch) => {
    if (Object.keys(profile.profile).length === 0 && Object.keys(profile.lock).length !== 0) {
      profile.lock.getProfile(profile.idToken, function (err, profile) {
        if (err) {
          dispatch(setError(err))
        } else {
          dispatch(setProfile(profile))
        }
      }.bind(this))
    }
  }
}

// var getFoos = fetch('https://api.fantasypollster.com/api/users/balance', {
//   headers: {
//     'Authorization': 'Bearer ' + localStorage.getItem('userToken')
//   },
//   method: 'GET',
//   cache: false
// })
// console.log('token: ', localStorage.getItem('userToken'))
// getFoos.then(function (response) {
//   response.json().then(function (foos) {
//     console.log('the balance:', foos)
//   })
// })

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('userToken')
    dispatch(removeData())
  }
}

function checkStatus (response) {
  return (dispatch) => {
    if (response.status === 404) {
      dispatch(notverified())
      return {}
    }
    return response.json()
  }
}

export const getBalance = () => {
  return (dispatch, getState) => {
    if (getState().profile.idToken !== null && getState().profile.idToken !== '') {
      dispatch(isFetchingBalance())
      var getFoos = fetch('https://api.fantasypollster.com/api/users/balance', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        },
        method: 'GET',
        cache: false
      })
      getFoos.then((response) => dispatch(checkStatus(response))).then((json) => dispatch(balance(json.balance)))
    }
  }
}

function handleStatus (response) {
  // console.log('status response', response.json)
  return {fuckyou: 'hacker'}
}

export const agree = (state) => {
  return (dispatch, getState) => {
    var getFoos = fetch('https://api.fantasypollster.com/api/users/agree', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        state: state
      })
    })
    getFoos.then((response) => handleStatus(response)).then((json) => dispatch(verify()))
  }
}

export const payout = (address, amount, check, email, name) => {
  return (dispatch, getState) => {
    fetch('https://api.fantasypollster.com/api/users/payout', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        address: address,
        amount: amount,
        check: check,
        email: email,
        name: name
      })
    })
    // getFoos.then((response) => handleStatus(response)).then((json) => dispatch(payout()))
  }
}

export const actions = {
  createLock,
  getProfile,
  logout,
  getBalance,
  agree,
  payout
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_TOKEN]: (state, action) => (Object.assign({}, state, {
    idToken: action.payload,
    error: false
  })),
  [SET_PROFILE]: (state, action) => (Object.assign({}, state, {
    profile: action.payload,
    error: false
  })),
  [SET_LOCK]: (state, action) => (Object.assign({}, state, {
    lock: action.payload
  })),
  [SET_ERROR]: (state, action) => (Object.assign({}, state, {
    error: action.payload
  })),
  [BALANCE]: (state, action) => (Object.assign({}, state, {
    balance: action.payload,
    isFetchingBalance: false
  })),
  [IS_FETCHING_BALANCE]: (state, action) => (Object.assign({}, state, {
    isFetchingBalance: true
  })),
  [NOT_VERIFIED]: (state, action) => (Object.assign({}, state, {
    verified: false
  })),
  [VERIFY]: (state, action) => (Object.assign({}, state, {
    verified: true
  })),
  [REMOVE_DATA]: (state, action) => (Object.assign({}, state, {
    idToken: '',
    profile: {},
    balance: 0,
    verified: true
  }))
}, {profile: {}, idToken: '', lock: {}, error: false, balance: 0, isFetchingBalance: false, verified: true})
