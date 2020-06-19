import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ACTION_TYPE.SET_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          profile: action.payload,
        },
      };
    case ACTION_TYPE.SET_BLOG:
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.profile,
            blog: action.payload,
          },
        },
      };
    default:
      return state;
  }
};
