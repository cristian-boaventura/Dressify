import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_UP_START:
    case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
      };

    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: payload,
      };

    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
