import { ACTIVATE_NAV_BUTTON, DEACTIVATE_NAV_BUTTON } from '../constants';

export const activateNavButton = () => {
  return {
    type: ACTIVATE_NAV_BUTTON,
  }
}

export const deactivateNavButton = () => {
  return {
    type: DEACTIVATE_NAV_BUTTON,
  }
}