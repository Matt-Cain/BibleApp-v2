import { GET_CHAPTERS_PENDING, SET_CHAPTER } from '../constants';

export const getChapters = (payload) => {
  return {
    type: GET_CHAPTERS_PENDING,
    payload: payload,
  }
}

export const setChapter = (payload) => {
  return {
    type: SET_CHAPTER,
    payload: payload,
  }
}