const namespace = 'SEARCH';

export const SET_SEARCH_TEXT = `${namespace}/SET_SEARCH_TEXT`;

export const setSearchText = payload => ({
  type: SET_SEARCH_TEXT,
  payload,
});