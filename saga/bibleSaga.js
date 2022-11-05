import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const apiUrl = 'https://api.scripture.api.bible/v1/bibles';

const getApi = () => {
	return axios({
		method: 'get',
		url: apiUrl,
		headers: {
			'api-key': 'deff6e2be79b28d7293f3b86c7637a5d',
		}
	});
}

function* fetchBibles(action) {
	try {
		const bibles = yield call(getApi);
		yield put({ type: 'GET_BIBLES_SUCCESS', bibles: bibles.data.data });
	} catch (e) {
		yield put({ type: 'GET_BIBLES_FAILED', message: e.message });
	}
}

function* bibleSaga() {
	yield takeEvery('GET_BIBLES_PENDING', fetchBibles);
}

export default bibleSaga;
