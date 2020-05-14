import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  signupValues: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_SIGNUP_FORM_VALUES:
      return {
        ...state,
        signupValues: {
          ...state.signupValues,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
