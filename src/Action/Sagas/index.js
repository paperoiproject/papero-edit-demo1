import { all } from 'redux-saga/effects';
import FirebaseSaga from './firebase';
import PaperoSaga from './papero';

export default function* rootSaga() {
  yield all([
    ...FirebaseSaga,
    ...PaperoSaga
  ]);
}
