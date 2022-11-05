import {
  GET_CHAPTERS_PENDING,
  GET_CHAPTERS_SUCCESS,
  GET_CHAPTERS_FAILED,
  SET_CHAPTER,
} from '../constants';

const initialState = {
  chapters: [],
  chapter: "",
  loading: false,
  error: null,
}

const chapters = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAPTERS_PENDING:
      return {
        ...state,
        loading: true,
      }
    case GET_CHAPTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        chapters: action.chapters,
      }
    case GET_CHAPTERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    case SET_CHAPTER:
      return {
        ...state,
        chapter: action.payload,
      }
    default:
      return state
  }
}

export default chapters;