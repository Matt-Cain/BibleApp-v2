import {
  GET_VERSES_FAILED,
  GET_VERSES_PENDING,
  GET_VERSES_SUCCESS,
  SET_VERSE,
} from '../constants';

const initialState = {
  verses: [],
  verse: "",
  loading: false,
  error: null,
}

const verses = (state = initialState, action) => {
  console.log('action reducer', action);
  switch (action.type) {
    case GET_VERSES_PENDING:
      return {
        ...state,
        loading: true,
      }
    case GET_VERSES_SUCCESS:
      return {
        ...state,
        loading: false,
        verses: action.verses,
      }
    case GET_VERSES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    case SET_VERSE:
      return {
        ...state,
        verse: action.payload,
      }
    default:
      return state
  }
}

export default verses;