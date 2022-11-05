import { call, put, takeEvery } from 'redux-saga/effects';
import { ARCHIVE_VERSE_PENDING, ARCHIVE_VERSE_SUCCESS, ARCHIVE_VERSE_FAILED } from '../constants';

function* archiveVerse(action) {
	try {
		yield put({ type: ARCHIVE_VERSE_SUCCESS, verse: action.payload });
	} catch (e) {
		yield put({ type: ARCHIVE_VERSE_FAILED, message: e.message });
	}
}

function* archiveSaga() {
	yield takeEvery(ARCHIVE_VERSE_PENDING, archiveVerse);
}

export default archiveSaga;
