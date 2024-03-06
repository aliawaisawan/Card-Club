import { ActionTypes } from "../constants/actionTypes"

export const setGifts = (data) => {
    return {
        type: ActionTypes.SET_GIFT,
        payload: data
    }
}