import { ActionTypes } from "../constants/actionTypes"

export const setUser = (data) => {
    return {
        type: ActionTypes.SET_USER,
        payload: data
    }
}