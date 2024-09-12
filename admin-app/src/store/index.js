import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
