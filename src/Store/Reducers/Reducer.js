import { combineReducers } from 'redux'
import fireBaseReducer from './FireBaseReducer.js'
import PaperoReducer from './PaperoReducer.js'

const Reducer = combineReducers({
  fireBaseReducer,
  PaperoReducer
});

export default Reducer
