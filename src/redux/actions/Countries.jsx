import { ActionTypes } from "../constants/actionTypes"

export const setCountries = (data) => {
    return {
        type: ActionTypes.SET_COUNTRY,
        payload: data
    }
}