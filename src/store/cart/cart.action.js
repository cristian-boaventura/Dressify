import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (productToAdd) =>
  createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART, productToAdd);

export const removeItemFromCart = (cartItemToRemove) =>
  createAction(CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, cartItemToRemove);

export const clearItemFromCart = (cartItemToClear) =>
  createAction(CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART, cartItemToClear);
