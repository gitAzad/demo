import { userActionTypes } from './user.action';

const INITIAL_STATE = null;

const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
