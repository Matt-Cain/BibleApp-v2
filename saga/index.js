import { all } from 'redux-saga/effects';
import bibleSaga from './bibleSaga';
import bookSaga from './bookSaga';
import chapterSaga from './chapterSaga';
import verseSaga from './verseSaga';

export default function* rootSaga() {
  yield all([
    bibleSaga(),
    bookSaga(),
    chapterSaga(),
    verseSaga(),
  ]);
}