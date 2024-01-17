import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chat";

const store = configureStore({
  reducer: chatReducer,
});

export default store;
