import * as ACTION_TYPE from "./actionTypes.js";

export const setUser = (values) => {
  return {
    type: ACTION_TYPE.SET_USER,
    payload: values,
  };
};

export const setProfile = (values) => {
  return {
    type: ACTION_TYPE.SET_PROFILE,
    payload: values,
  };
};

export const setBlog = (values) => {
  return {
    type: ACTION_TYPE.SET_BLOG,
    payload: values,
  };
};
