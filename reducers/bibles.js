import {
  GET_BIBLES_PENDING,
  GET_BIBLES_SUCCESS,
  GET_BIBLES_FAILED,
  SET_BIBLE,
} from '../constants';

const initialState = {
  bibles: [],
  bible: "",
  loading: false,
  error: null,
}

const bibles = (state = initialState, action) => {
  switch (action.type) {
    case GET_BIBLES_PENDING:
      return {
        ...state,
        loading: true,
      }
    case GET_BIBLES_SUCCESS:
      return {
        ...state,
        loading: false,
        bibles: action.bibles.filter((bible) => bible.language.id === 'eng'),
      }
    case GET_BIBLES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    case SET_BIBLE:
      return {
        ...state,
        bible: action.payload,
      }
    default:
      return state
  }
}

export default bibles;