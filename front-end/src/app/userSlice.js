import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:null,
    role:null
};


const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        change_token:(state,action)=>{
            state.token=action.payload.token;
            state.role=action.payload.role;
        },
        log_out:()=>{
            return initialState;
        }
    }
});


export default userSlice.reducer;
export const {change_token,log_out}=userSlice.actions;