import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
const store=configureStore({
    reducer:{
        user:userReducer,
        store:storeReducer,
        cart:cartReducer
    }
});

export default store;