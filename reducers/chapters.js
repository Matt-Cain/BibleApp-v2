import {
  GET_CHAPTERS_PENDING,
  GET_CHAPTERS_SUCCESS,
  GET_CHAPTERS_FAILED,
  SET_CHAPTER,
} from '../constants';

const initialState = {
  chapters: [],
  chapter: "",
  chapterNumber: "",
  loading: false,
  error: null,
}

const chapters = (state = initialState, action) => {
  console.log(action);
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
        chapter: action.payload.name,
        chapterNumber: action.payload.number,
      }
    default:
      return state
  }
}

export default chapters;