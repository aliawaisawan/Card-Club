import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { countryReducer } from "./countryReducer";
import { cardReducer } from "./cardReducer";
import { giftReducer } from "./giftReducer";
import { cardProductReducer } from "./cardProductReducer";
import { giftProductReducer } from "./giftProductReducer";
import { wishlistReducer } from "./wishlistReducer";
import { cartReducer } from "./cartReducer";
import { reminderReducer } from "./reminderReducer";
import { addressReducer } from "./addressReducer";
import { contactsReducer } from "./contactsReducer";

const reducers = combineReducers({
    userDetails: userReducer,
    countries: countryReducer,
    cardCat: cardReducer,
    giftCat: giftReducer,
    cardProduct: cardProductReducer,
    giftProduct: giftProductReducer,
    wishlist: wishlistReducer,
    cartlist: cartReducer,
    reminderlist: reminderReducer,
    addresses: addressReducer,
    contactslist: contactsReducer
});

export default reducers

