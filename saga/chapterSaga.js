import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_CHAPTERS_SUCCESS, GET_CHAPTERS_FAILED, GET_CHAPTERS_PENDING } from '../constants';
import axios from 'axios';

const getApi = ({bibles, books}) => {
	const apiUrl = `https://api.scripture.api.bible/v1/bibles/65bfdebd704a8324-01/books/${books}/chapters`;

	return axios({
		method: 'get',
		url: apiUrl,
		headers: {
			'api-key': 'deff6e2be79b28d7293f3b86c7637a5d',
		}
	});
}

function* fetchChapters(action) {
	try {
		const chapters = yield call(getApi, action.payload);
		yield put({ type: GET_CHAPTERS_SUCCESS, chapters: chapters.data.data });
	} catch (e) {
		yield put({ type: GET_CHAPTERS_FAILED, message: e.message });
	}
}

function* chapterSaga() {
	yield takeEvery(GET_CHAPTERS_PENDING, fetchChapters);
}

export default chapterSaga;
