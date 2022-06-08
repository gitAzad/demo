import {
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
  SET_APPBAR_TITLE,
  TOGGLE_SIDEBAR,
} from './sidebar.action';

export interface State {
  isOpen: boolean;
  appbarTitle?: string;
}

export const initialState: State = {
  isOpen: false,
  appbarTitle: '',
};

export function sidebarReducer(state = initialState, action: any): State {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        isOpen: !state.isOpen,
      };
    case OPEN_SIDEBAR:
      return {
        isOpen: true,
      };
    case CLOSE_SIDEBAR:
      return {
        isOpen: false,
      };
    case SET_APPBAR_TITLE:
      return {
        ...state,
        appbarTitle: action.title,
      };
    default:
      return state;
  }
}
