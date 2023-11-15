import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
      paymentSuccess: false,
    },
    reducers: {
      paymentSucceeded: (state) => {
        state.paymentSuccess = true;
      },
      resetPaymentStatus: (state) => {
        state.paymentSuccess = false;
      },
    },
  });
  
  export const { paymentSucceeded, resetPaymentStatus } = paymentSlice.actions;
  export default paymentSlice.reducer;