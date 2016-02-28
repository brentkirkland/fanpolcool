import { createAction, handleActions } from 'redux-actions'
import Immutable from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const PUSH_ONTO_CHAIN = 'PUSH_ONTO_CHAIN'
export const ADD_TO_EVERY_SENTENCE = 'ADD_TO_EVERY_SENTENCE'
export const SET_NUMBER_OF_CANDIDATES = 'SET_NUMBER_OF_CANDIDATES'
export const CLEAR_GAME = 'CLEAR_GAME'
export const SET_TOTAL_POINTS = 'SET_TOTAL_POINTS'
export const DID_SUBMIT = 'DID_SUBMIT'
// ------------------------------------
// Actions
// ------------------------------------

const pushOntoChain = createAction(PUSH_ONTO_CHAIN, (c = {}) => c)
const addToEverySentence = createAction(ADD_TO_EVERY_SENTENCE, (m = {}) => m)
const setNumberOfCandidates = createAction(SET_NUMBER_OF_CANDIDATES, (n = 0) => n)
const clearGame = createAction(CLEAR_GAME)
const setNumberOfPoints = createAction(SET_TOTAL_POINTS, (n = 0) => n)
const submit = createAction(DID_SUBMIT, (b = 0) => b)

function createSentence (candidate, place, state) {
  return candidate + ' wins ' + place + ' in ' + state
}

function createMap (element) {
  return (dispatch, getState) => {
    var newmap
    var left = element.candidate + element.state
    var right = element.place + ' in ' + element.state
    var date = Date.now()
    if (Object.keys(getState().game.every_selection).length === 0) {
      newmap = Immutable.Map({[element.sentence]: date, [right]: date, [left]: date})
    } else {
      var map2 = getState().game.every_selection
      var map1 = map2.set(element.sentence, date)
      var map3 = map1.set(left, date)
      newmap = map3.set(right, date)
    }
    dispatch(addToEverySentence(newmap))
  }
}

function stringPlaceToText (text) {
  switch (text) {
    case '1st':
      return 1
    case '2nd':
      return 2
    case '3rd':
      return 3
    case '4th':
      return 4
    case '5th':
      return 5
    case '6th':
      return 6
    case '7th':
      return 7
    case '8th':
      return 8
    case '9th':
      return 9
    case '10th':
      return 10
    case '11th':
      return 11
    case '12th':
      return 12
    case '13th':
      return 13
    case '14th':
      return 14
    case '15th':
      return 15
    case '16th':
      return 16
    case '17th':
      return 17
    case '18th':
      return 18
    case '19th':
      return 19
    case '20th':
      return 20
  }
}

function calculatePoints (block, num) {
  if (num === 0) {
    return 0
  }
  function isBigEnough (value) {
    return value.place !== num
  }
  var p = Math.pow(2, block.filter(isBigEnough).length - 1)
  if (p < 1) {
    return 0
  }
  return p
}

function splitIntoABlock (array) {
  var sub = []
  for (var i = 0; i < array.length; i++) {
    sub.push({
      candidate: array[i].candidate,
      place: array[i].placeNumber,
      state: array[i].state
    })
  }
  return sub
}

function makeUniqueKey (array) {
  var sentence = ''
  for (var i = 0; i < array.length; i++) {
    sentence = sentence + array[i].candidate.substring(0, 3) +
    array[i].place.substring(0, 1) +
    array[i].state.substring(0, 3)
  }
  return sentence
}

export const addFromTop = (image, candidate, place, state) => {
  return (dispatch, getState) => {
    const sentence = createSentence(candidate, place, state)
    const element = {
      candidate: candidate,
      state: state,
      image: image,
      place: place,
      placeNumber: stringPlaceToText(place),
      sentence: sentence,
      index: 0
    }
    var points = calculatePoints(splitIntoABlock([element]), getState().game.number_of_canidates)
    dispatch(setNumberOfPoints(getState().game.total_points + points))
    var sen = makeUniqueKey([element])

    var l = Immutable.List([element])

    var chain = {
      items: l,
      points: points,
      ukey: sen
    }
    var chains
    if (Object.keys(getState().game.chains).length === 0) {
      chains = Immutable.List([chain])
    } else {
      var c = getState().game.chains
      chains = c.unshift(chain)
    }

    dispatch(createMap(element))
    dispatch(pushOntoChain(chains))
  }
}

export const addFromChain = (id, image, candidate, place, state) => {
  return (dispatch, getState) => {
    const sentence = createSentence(candidate, place, state)
    var chain = getState().game.chains.get(id)
    var element = {
      candidate: candidate,
      state: state,
      image: image,
      place: place,
      placeNumber: stringPlaceToText(place),
      sentence: sentence,
      index: chain.items.size
    }
    var items = chain.items.push(element)
    var points = calculatePoints(splitIntoABlock(items.toArray()), getState().game.number_of_canidates)
    dispatch(setNumberOfPoints(getState().game.total_points - getState().game.chains.get(id).points + points))
    var ukey = makeUniqueKey(chain.items.toArray())
    var chains = getState().game.chains.set(id, {items: items, points: points, ukey: ukey})

    dispatch(createMap(element))
    dispatch(pushOntoChain(chains))
  }
}

export const calculateNumberOfCandidates = (id) => {
  return (dispatch, getState) => {
    if (getState().game.number_of_canidates === 0 && getState().games.mappedItems.size > 0) {
      dispatch(setNumberOfCandidates(getState().games.mappedItems.get(id).candidates.length))
    } else {
      // dispatch(calculateNumberOfCandidates(id))
    }
  }
}

export const deleteRow = (i, id) => {
  return (dispatch, getState) => {
    var chains = getState().game.chains
    var chain = getState().game.chains.get(id)
    var items = chain.items
    var newchains
    if (items.size === 1) {
      newchains = chains.delete(id)
      dispatch(setNumberOfPoints(getState().game.total_points - 1))
    } else {
      var newitems = items.delete(i)
      var ukey = makeUniqueKey(newitems.toArray())
      var points = calculatePoints(splitIntoABlock(newitems.toArray()), getState().game.number_of_canidates)
      dispatch(setNumberOfPoints(getState().game.total_points - getState().game.chains.get(id).points + points))
      newchains = getState().game.chains.set(id, {items: newitems, points: points, ukey: ukey})
    }

    // delete items from map
    var candidate = items.get(i).candidate
    var place = items.get(i).place
    var state = items.get(i).state
    var sentence = candidate + ' wins ' + place + ' in ' + state
    var left = candidate + state
    var right = place + ' in ' + state
    var es1 = getState().game.every_selection.delete(sentence)
    var es2 = es1.delete(left)
    var es3 = es2.delete(right)
    dispatch(addToEverySentence(es3))
    dispatch(pushOntoChain(newchains))
  }
}

export const clear = () => {
  return (dispatch) => {
    dispatch(clearGame())
  }
}

export const submitGame = (id) => {
  return (dispatch, getState) => {
    // var position = []
    // var block = {}
    // var prediction = []
    // getState().game.chains.map(function (chain) {
    //   for (var i = 0; i < chain.items.size; i++) {
    //     var g = chain.items.get(i)
    //     var x = {candidate: getState().candidates.mappedNames.get(g.name), place: g.placeNumber, state: g.state}
    //     console.log(x)
    //   }
    // })
    var position = []
    var chains = getState().game.chains
    for (var i = 0; i < chains.size; i++) {
      var c = chains.get(i).items
      var block = {prediction: []}
      for (var j = 0; j < c.size; j++) {
        var g = c.get(j)
        var x = {
          candidate: getState().candidates.mappedNames.get(g.candidate),
          place: g.placeNumber, state: getState().states.mappedNames.get(g.state)
        }
        block.prediction.push(x)
      }
      position.push(block)
    }
    // console.log(position, id)
    if (position.length > 0) {
      var p = fetch('https://api.fantasypollster.com/api/positions', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          position: position,
          match: id
        })
      })
      var status = p.then(checkStatus)
      if (status) {
        dispatch(submit(1))
      } else {
        dispatch(submit(0))
      }
    }
  }
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return true
  } else {
    var error = new Error(response.statusText)
    error.response = response
    return false
  }
}

export const actions = {
  addFromTop,
  addFromChain,
  calculateNumberOfCandidates,
  submitGame,
  deleteRow,
  clear
}

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [PUSH_ONTO_CHAIN]: (state, action) => (Object.assign({}, state, {
    chains: action.payload
  })),
  [ADD_TO_EVERY_SENTENCE]: (state, action) => (Object.assign({}, state, {
    every_selection: action.payload
  })),
  [SET_NUMBER_OF_CANDIDATES]: (state, action) => (Object.assign({}, state, {
    number_of_canidates: action.payload
  })),
  [SET_TOTAL_POINTS]: (state, action) => (Object.assign({}, state, {
    total_points: action.payload
  })),
  [DID_SUBMIT]: (state, action) => (Object.assign({}, state, {
    didSubmit: action.payload
  })),
  [CLEAR_GAME]: (state, action) => (Object.assign({}, state, {
    chains: {},
    number_of_canidates: 0,
    total_points: 0,
    every_selection: {},
    didSubmit: 0
  }))
}, {every_selection: {}, chains: {}, total_points: 0, number_of_canidates: 2, isSubmitting: false, didSubmit: 0})
