import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  reminder: [],
};

export const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_REMINDER:
      return {
        ...state,
        reminder: action.payload,
      };
    default:
      return state;
  }
};
