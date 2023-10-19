import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "cartCounter",
  initialState: {
    cartCount: 0
  },
  reducers: {
    increment: (state) => {
      state.cartCount += 1;
    },
    decrement: (state) => {
      state.cartCount -= 1;
    },
    decrementByAmount: (state, action) => {
      state.cartCount += action.payload;
    }
  }
});

export const { increment, decrement, decrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;