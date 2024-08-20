import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:null
};


const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        change_token:(state,action)=>{
            state.token=action.payload
        }
    }
});


export default userSlice.reducer;
export const {change_token}=userSlice.actions;