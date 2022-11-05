import {
  GET_VERSES_FAILED,
  GET_VERSES_PENDING,
  GET_VERSES_SUCCESS,
  CLEAR_VERSES,
  SET_VERSE
} from '../constants';

const initialState = {
  verses: [],
  verse: "",
  loading: false,
  error: null,
}

const verses = (state = initialState, action) => {
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
    case CLEAR_VERSES:
      return {
        ...state,
        verses: [],
      }
    default:
      return state
  }
}

export default verses;