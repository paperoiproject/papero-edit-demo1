import { call, put, takeEvery } from 'redux-saga/effects';
import { sendWork } from '../Api/papero';

import {sended, sendFailed} from "../Actions/papero";

function* sendwork(action) {
  const {error, state} = yield call(sendWork, action.work);
  if (error) {
    yield put(sendFailed());
  } else {
    console.log(state)
    yield put(sended());
  }
}

const saga = [
  takeEvery('SEND', sendwork),
];

export default saga;