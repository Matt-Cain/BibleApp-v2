import {
  GET_BOOKS_PENDING,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILED,
  SET_BOOK,
} from '../constants';

const initialState = {
  books: [],
  book: "",
  loading: false,
  error: null,
}

const books = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_PENDING:
      return {
        ...state,
        loading: true,
      }
    case GET_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.books,
      }
    case GET_BOOKS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    case SET_BOOK:
      return {
        ...state,
        book: action.payload,
      }
    default:
      return state
  }
}

export default books;