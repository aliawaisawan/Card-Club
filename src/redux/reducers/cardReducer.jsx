import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  card: [],
};

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CARD:
      return {
        ...state,
        card: action.payload,
      };
    default:
      return state;
  }
};
