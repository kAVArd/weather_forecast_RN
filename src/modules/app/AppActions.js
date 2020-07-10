const namespace = 'APP';

export const CHANGE_ACTIVE_TAB = `${namespace}/CHANGE_ACTIVE_TAB`;
export const SET_UNITS_TYPE = `${namespace}/SET_UNITS_TYPE`;

export const changeActiveTab = (payload) => ({
  type: CHANGE_ACTIVE_TAB,
  payload,
});

export const setUnitsType = (type) => ({
  type: SET_UNITS_TYPE,
  payload: {
    type,
  },
});