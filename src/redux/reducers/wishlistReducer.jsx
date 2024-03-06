import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  wishlist: [],
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    default:
      return state;
  }
};
