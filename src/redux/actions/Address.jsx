import { ActionTypes } from "../constants/actionTypes"

export const setAddress = (data) => {
    return {
        type: ActionTypes.SET_ADDRESS,
        payload: data
    }
}