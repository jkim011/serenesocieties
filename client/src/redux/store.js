import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./cartCounter";

export default configureStore({
  reducer: {
    cartCounter: counterReducer
  }
});