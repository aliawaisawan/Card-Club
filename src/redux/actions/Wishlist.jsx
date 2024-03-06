import { ActionTypes } from "../constants/actionTypes"

export const setWishlist = (data) => {
    return {
        type: ActionTypes.SET_WISHLIST,
        payload: data
    }
}