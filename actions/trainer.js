import { SET_AS_CURRENT_VERSE } from '../constants';

export const setTrainingVerse = (payload) => {
  return {
    type: SET_AS_CURRENT_VERSE,
    payload: payload,
  }
}