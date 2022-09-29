import { AnyAction } from "redux";
import {
  emailSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpStart,
  User,
} from "./user.action";

export type UserState = {
  readonly currentUser: User | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = USER_INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (signUpStart.match(action) || emailSignInStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (signInSuccess.match(action)) {
    return {
      ...state,
      isLoading: false,
      currentUser: action.payload,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }

  if (
    signOutFailed.match(action) ||
    signInFailed.match(action) ||
    signUpFailed.match(action)
  ) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }

  return state;
};
