import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../assets/frontend_assets/assets"
const initialState={
    food_list
};
const storeSlice=createSlice({
    name:'store',
    initialState,
    reducers:{}
});

export default storeSlice.reducer;
