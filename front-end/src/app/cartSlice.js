import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart:(state, action) => {
        const selectedItem = state.find(
          (item) => item._id === action.payload
        );
        if (selectedItem) {
          selectedItem.count++;
        } else {
          state.push({_id:action.payload,count:1});
        }
      },
      decreaseItem:(state,action)=>{
        const selectedItem = state.find(
          (item) => item._id === action.payload
        );
        if(selectedItem){
          selectedItem.count--;
        }
      },
    removeFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});
export default cartSlice.reducer;
export const { addToCart,decreaseItem, removeFromCart } = cartSlice.actions;
