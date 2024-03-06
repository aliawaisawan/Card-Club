import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  giftinfo: [],
};

export const giftProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_GIFTPRODUCT:
      return {
        ...state,
        giftinfo: action.payload,
      };
    default:
      return state;
  }
};
