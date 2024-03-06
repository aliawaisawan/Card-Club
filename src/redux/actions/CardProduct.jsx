import { ActionTypes } from "../constants/actionTypes"

export const setCardProduct = (data) => {
    return {
        type: ActionTypes.SET_CARDPRODUCT,
        payload: data
    }
}