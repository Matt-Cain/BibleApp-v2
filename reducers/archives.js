import {
  ARCHIVE_VERSE_PENDING,
  ARCHIVE_VERSE_SUCCESS,
  ARCHIVE_VERSE_FAILED,
  SAVE_AS_FAVORITE,
  REMOVE_AS_FAVORITE,
} from '../constants';
import { v4 as uuid } from 'uuid';

const initialState = {
  verses: [],
  loading: false,
  error: null,
}

const archives = (state = initialState, action) => {
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
        verses: [...state.verses, { ...action.verse, isFavorite: false, id: uuid() }],
      }
    case ARCHIVE_VERSE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    case SAVE_AS_FAVORITE:
      return {
        ...state,
        verses: state.verses.map((verse) => verse.id === action.payload.id ? {...verse, isFavorite: true} : verse),
      }
    case REMOVE_AS_FAVORITE:
      return {
        ...state,
        verses: state.verses.map((verse) => verse.id === action.payload.id ? {...verse, isFavorite: false} : verse),
      }
    default:
      return state
  }
}

export default archives;