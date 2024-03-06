import { ActionTypes } from "../constants/actionTypes"

export const setReminder = (data) => {
    return {
        type: ActionTypes.SET_REMINDER,
        payload: data
    }
}