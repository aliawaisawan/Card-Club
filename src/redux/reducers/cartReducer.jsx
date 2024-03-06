import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
