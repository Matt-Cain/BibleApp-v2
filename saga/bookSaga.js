import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_BOOKS_SUCCESS, GET_BOOKS_FAILED } from '../constants';
import axios from 'axios';

const getApi = () => {
	const apiUrl = `https://api.scripture.api.bible/v1/bibles/65eec8e0b60e656b-01/books`;

	return axios({
		method: 'get',
		url: apiUrl,
		headers: {
			'api-key': 'deff6e2be79b28d7293f3b86c7637a5d',
		}
	});
}

function* fetchBooks(action) {
	try {
		const books = yield call(getApi);
		yield put({ type: GET_BOOKS_SUCCESS, books: books.data.data });
	} catch (e) {
		yield put({ type: GET_BOOKS_FAILED, message: e.message });
	}
}

function* bookSaga() {
	yield takeEvery('GET_BOOKS_PENDING', fetchBooks);
}

export default bookSaga;
