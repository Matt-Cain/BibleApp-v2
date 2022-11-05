import { GET_VERSES_PENDING, SET_VERSES, CLEAR_VERSES } from '../constants';

export const getVerses = (payload) => {
  return {
    type: GET_VERSES_PENDING,
    payload: payload,
  }
}

export const setVerse = (payload) => {
  return {
    type: SET_VERSES,
    payload: payload,
  }
}

export const clearVerses = () => {
  return {
    type: CLEAR_VERSES,
  }
}