import { GET_BOOKS_PENDING, SET_BOOK } from '../constants';

export const getBooks = (payload) => {
  return {
    type: GET_BOOKS_PENDING,
    payload: payload,
  }
}

export const setBook = (payload) => {
  return {
    type: SET_BOOK,
    payload: payload,
  }
}