import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  cardinfo: [],
};

export const cardProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CARDPRODUCT:
      return {
        ...state,
        cardinfo: action.payload,
      };
    default:
      return state;
  }
};
