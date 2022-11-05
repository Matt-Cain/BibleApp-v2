import { GET_BIBLES_PENDING, SET_BIBLE } from '../constants';

export const getBibles = () => {
  return {
    type: GET_BIBLES_PENDING,
  }
}

export const setBible = (bibleId) => {
  return {
    type: SET_BIBLE,
    payload: bibleId,
  }
}