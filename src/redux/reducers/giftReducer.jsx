import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  gift: [],
};

export const giftReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_GIFT:
      return {
        ...state,
        gift: action.payload,
      };
    default:
      return state;
  }
};
