import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_VERSES_FAILED, GET_VERSES_SUCCESS, GET_VERSES_PENDING } from '../constants';
import axios from 'axios';

const getApi = ({ books, chapters }) => {
	console.log('book stuff', book);
	console.log('chapter stuff', chapter);
	const apiUrl = `http://labs.bible.org/api/?passage=${chapters}&type=json`;
	console.log('apiUrl fklsdjflksdjflksdj', apiUrl);

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
		console.log('chapters fetch verses', verses);
		yield put({ type: GET_VERSES_SUCCESS, verses: verses.data.data });
	} catch (e) {
		yield put({ type: GET_VERSES_FAILED, message: e.message });
	}
}

function* verseSaga() {
	yield takeEvery(GET_VERSES_PENDING, fetchVerses);
}

export default verseSaga;
