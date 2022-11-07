import { GET_CHAPTERS_PENDING, SET_CHAPTER, CLEAR_CHAPTERS } from '../constants';

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

export const clearChapters = () => {
  return {
    type: CLEAR_CHAPTERS
  }
}