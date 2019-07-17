import { call, put, takeEvery } from 'redux-saga/effects';
import { loadFirebase , updateData, updateTime} from '../Api/firebase';

import {load, loaded} from "../Actions/firebase";

function* loadData(action) {
  const data_list = yield call(loadFirebase);
  yield put(loaded(data_list));
}

function* update(action) {
  const data_list = yield call(updateData, action.new_data);
  yield put(load());
}

function* updatetime(action) {
  const data_list = yield call(updateTime, action.new_time);
  yield put(load());
}

const saga = [
  takeEvery('LOAD', loadData),
  takeEvery('UPDATEDATA', update),
  takeEvery('UPDATETIME', updatetime)
];

export default saga;