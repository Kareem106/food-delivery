import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
    key: 'root',
    storage,
  };
  const combinedReducers=combineReducers({
    user:userReducer,
    cart:cartReducer
  });
  const persistedReducer = persistReducer(persistConfig, combinedReducers);
 
const store=configureStore({
    reducer:persistedReducer,
    devTools: import.meta.env.VITE_ENV !== 'production',
});

export default store;
export const persistor = persistStore(store);