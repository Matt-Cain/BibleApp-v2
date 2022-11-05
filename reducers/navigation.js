import {
  ACTIVATE_NAV_BUTTON,
  DEACTIVATE_NAV_BUTTON,
} from '../constants';

const initialState = {
  navButtonActive: false,
}

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_NAV_BUTTON:
      return {
        ...state,
        navButtonActive: true,
      }
    case DEACTIVATE_NAV_BUTTON:
      return {
        ...state,
        navButtonActive: false,
      }
    default:
      return state
  }
}

export default navigation;