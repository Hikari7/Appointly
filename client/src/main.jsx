import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { store } from "./redux/store";

let persistor = persistStore(store);


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);
