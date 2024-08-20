

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminSlice";

// persistReducer and persistStore from redux-persist: Used to add persistence capabilities to the Redux store, 
// enabling the state to be saved to and rehydrated from local storage.
import { persistReducer, persistStore } from "redux-persist";

// storage from redux-persist/lib/storage: Specifies the storage engine to use for persisting the state, 
// in this case, local storage.
import storage from "redux-persist/lib/storage";

// Combines Reducers: Combines multiple slice reducers (in this case, just the userReducer) into a root reducer.
const rootReducer = combineReducers({
  admin: adminReducer,
});

// persistConfig: Specifies the configuration options for the state persistence, including the key, storage engine, and version.
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};



// State Persistence: Enhances the root reducer with persistence capabilities using redux-persist, allowing the state to be saved to and loaded from local storage.
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

