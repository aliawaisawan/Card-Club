import { ActionTypes } from "../constants/actionTypes"

export const setContacts = (data) => {
    return {
        type: ActionTypes.SET_CONTACTS,
        payload: data
    }
}