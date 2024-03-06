import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  countries: [],
};

export const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_COUNTRY:
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return state;
  }
};
