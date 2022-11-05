import {
  ARCHIVE_VERSE_PENDING,
  ARCHIVE_VERSE_SUCCESS,
  ARCHIVE_VERSE_FAILED,
} from '../constants';

const initialState = {
  verses: [],
  loading: false,
  error: null,
}

const archives = (state = initialState, action) => {
  console.log('archives reducer', action);
  switch (action.type) {
    case ARCHIVE_VERSE_PENDING:
      return {
        ...state,
        loading: true,
      }
    case ARCHIVE_VERSE_SUCCESS:
      return {
        ...state,
        loading: false,
        verses: [...state.verses, action.verse],
      }
    case ARCHIVE_VERSE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}

export default archives;