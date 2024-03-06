import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  user: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
