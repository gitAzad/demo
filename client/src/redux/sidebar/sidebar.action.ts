export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const SET_APPBAR_TITLE = 'SET_APPBAR_TITLE';

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR,
});

export const openSidebar = () => ({
  type: OPEN_SIDEBAR,
});

export const setAppbarTitle = (title: string) => ({
  type: SET_APPBAR_TITLE,
  title,
});
