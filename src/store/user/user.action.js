import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const emailSignUpStart = (credentials) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, credentials);

export const signOutStart = () => ``;
createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
