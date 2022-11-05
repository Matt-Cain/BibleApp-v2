import { GET_VERSES_PENDING, SET_VERSES } from '../constants';

export const getVerses = (payload) => {
  console.log('payload get verses', payload);
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