import { ActionTypes } from "../constants/actionTypes"

export const setCards = (data) => {
    return {
        type: ActionTypes.SET_CARD,
        payload: data
    }
}