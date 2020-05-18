import * as ACTION_TYPE from "./actionTypes.js";

export const setUser = (values) => {
  return {
    type: ACTION_TYPE.SET_USER,
    payload: values,
  };
};
