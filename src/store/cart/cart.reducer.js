import { CART_ACTION_TYPES } from "./cart.types";
import {
  addCartItem,
  removeCartItem,
  clearCartItem,
} from "../../utils/reducer/reducer.utils";

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  const { cartItems } = state;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART: {
      const newCartItems = addCartItem(cartItems, payload);
      return {
        ...state,
        cartItems: newCartItems,
      };
    }
    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART: {
      const newCartItems = removeCartItem(cartItems, payload);
      return {
        ...state,
        cartItems: newCartItems,
      };
    }
    case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART: {
      const newCartItems = clearCartItem(cartItems, payload);
      return {
        ...state,
        cartItems: newCartItems,
      };
    }
    default:
      return state;
  }
};
