import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_VERSES_FAILED, GET_VERSES_SUCCESS, GET_VERSES_PENDING } from '../constants';
import axios from 'axios';

const getApi = (payload) => {
	const param = payload.replace(" ", "+");
	const apiUrl = `http://labs.bible.org/api/?passage=${param}&type=json`;

	return axios({
		method: 'get',
		url: apiUrl,
		headers: {
			'api-key': 'deff6e2be79b28d7293f3b86c7637a5d',
		}
	});
}

function* fetchVerses(action) {
	try {
		const verses = yield call(getApi, action.payload);
		console.log('verses', verses);
		yield put({ type: GET_VERSES_SUCCESS, verses: verses.data });
	} catch (e) {
		yield put({ type: GET_VERSES_FAILED, message: e.message });
	}
}

function* verseSaga() {
	yield takeEvery(GET_VERSES_PENDING, fetchVerses);
}

export default verseSaga;
