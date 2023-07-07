import { call, put, takeEvery } from 'redux-saga/effects';
import { ARCHIVE_VERSE_PENDING, ARCHIVE_VERSE_SUCCESS, ARCHIVE_VERSE_FAILED } from '../constants';
import { sanitizeVerse } from '../mutations/sanitize';
import addHomophonesToVerse from '../mutations/homophones';

function* archiveVerse(action) {
	try {
		const sanitizedVerse = yield call(sanitizeVerse, action.payload);
		console.log('sanitizedVerse', sanitizedVerse);
		const verseWithHomophones = yield call(addHomophonesToVerse, sanitizedVerse);
		console.log('verseWithHomophones', verseWithHomophones);
		yield put({ type: ARCHIVE_VERSE_SUCCESS, verse: verseWithHomophones });
	} catch (e) {
		yield put({ type: ARCHIVE_VERSE_FAILED, message: e.message });
	}
}

function* archiveSaga() {
	yield takeEvery(ARCHIVE_VERSE_PENDING, archiveVerse);
}

export default archiveSaga;
