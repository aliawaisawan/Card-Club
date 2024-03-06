import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  contacts: [],
};

export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    default:
      return state;
  }
};
