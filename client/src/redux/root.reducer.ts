import { combineReducers } from 'redux';
import { sidebarReducer } from './sidebar/sidebar.reducer';

import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;
