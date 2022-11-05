import * as type from '../constants/types';

export const getUsers = () => {
  return {
    type: type.GET_USERS_REQUESTED,
  }
}