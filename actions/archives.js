import { ARCHIVE_VERSE_PENDING, SAVE_AS_FAVORITE, REMOVE_AS_FAVORITE } from '../constants';

export const archiveVerse = (payload) => {
  return {
    type: ARCHIVE_VERSE_PENDING,
    payload: payload,
  }
}

export const saveAsFavorite = (payload) => {
  return {
    type: SAVE_AS_FAVORITE,
    payload: payload,
  }
}

export const removeAsFavorite = (payload) => {
  return {
    type: REMOVE_AS_FAVORITE,
    payload: payload,
  }
}