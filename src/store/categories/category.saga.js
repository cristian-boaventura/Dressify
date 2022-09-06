import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    // call() will call the method with the subsequent string as a parameter. Note the categories parameter is actually misleading but I will leave it for reference of the call method.
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    // put() works like dispatch.
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// This generator function will hear for the fetch_categories_start action to occur and run the subsequent function.
export function* onFetchCategories() {
  // take is wehere we receive actions, takeLatest() means if you hear a bunch of the same action, give me the latest one, so it cancels all previous ones.
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // all() receives an array of different functions, and wait until all of them completes before continue.
  yield all([call(onFetchCategories)]);
}
