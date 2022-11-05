import { ARCHIVE_VERSE_PENDING } from '../constants';

export const archiveVerse = (payload) => {
  return {
    type: ARCHIVE_VERSE_PENDING,
    payload: payload,
  }
}