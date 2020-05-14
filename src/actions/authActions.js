import * as ACTION_TYPE from "./actionTypes";

export const setSignupFormValues = (values) => {
  return {
    type: ACTION_TYPE.SET_SIGNUP_FORM_VALUES,
    payload: values,
  };
};
