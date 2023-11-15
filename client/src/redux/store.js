import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./cartCounter";
import paymentReducer from './paymentStatus';

export default configureStore({
  reducer: {
    cartCounter: counterReducer,
    payment: paymentReducer
  }

});