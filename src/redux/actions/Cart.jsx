import { ActionTypes } from "../constants/actionTypes"

export const setCart = (data) => {
    return {
        type: ActionTypes.SET_CART,
        payload: data
    }
}