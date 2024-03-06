import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store, { Persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51NfGtoDU6b1FUJFu6mKvi5YfaSGgf2lRApZauTBjGymQVyhv4TUgsyXUGPesnXUMXm2VS4BoSOJWT8HGasZF4R4t00iz1teUzP"
);

axios.defaults.baseURL = "https://editor-api.lidojs.com";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={false} persistor={Persistor}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
