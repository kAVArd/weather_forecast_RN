const namespace = 'APP';

export const CHANGE_ACTIVE_TAB = `${namespace}/CHANGE_ACTIVE_TAB`;

export const changeActiveTab = (payload) => ({
  type: CHANGE_ACTIVE_TAB,
  payload,
});