import { ActionTypes } from "../constants/actionTypes"

export const setGiftProduct = (data) => {
    return {
        type: ActionTypes.SET_GIFTPRODUCT,
        payload: data
    }
}