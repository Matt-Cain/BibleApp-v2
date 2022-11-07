import { SET_AS_CURRENT_VERSE } from '../constants';

const initialState = {
  currentVerse: null,
}

const trainer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AS_CURRENT_VERSE:
      return {
        ...state,
        currentVerse: action.payload,
      }
    default:
      return state
  }
}

export default trainer;