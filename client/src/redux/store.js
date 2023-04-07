import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import userInfoReducer from "../redux/slicers/userSlice";
import registerInfoReducer from "../redux/slicers/registerInfo";
import availabilityReducer from "../redux/slicers/availbilitySlice";
import listAppointmentReducer from "./slicers/listAppointment";

const reducers = combineReducers({
  user: userInfoReducer,
  appointment: registerInfoReducer,
  availability: availabilityReducer,
  listAppointment: listAppointmentReducer
});

const persistConfig = {
  key: 'root',
  storage,
  timeout: 300
};

const persistedReducer = persistReducer(
  persistConfig,
  reducers
);


export const store = configureStore({
  // reducer: reducers,
  reducer: persistedReducer,
  middleware: [thunk]
  // middleware:  (getDefaultMiddleware) => [
  //   ...getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  //   thunk
  // ],
});

export const persistor = persistStore(store)


// export const store = configureStore({
//   reducer: {
//     user: userInfoReducer,
//     appointment: registerInfoReducer,
//     availability: availabilityReducer,
//     listAppointment: listAppointmentReducer
//   },
// });
