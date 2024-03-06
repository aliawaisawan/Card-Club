import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  address: [],
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};
