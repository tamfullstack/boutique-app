import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popup";
import categoryReducer from "./category";
import cartReducer from "./cart";
import chatReducer from "./chat";

const store = configureStore({
  reducer: {
    popup: popupReducer,
    category: categoryReducer,
    cart: cartReducer,
    chat: chatReducer,
  },
});

export default store;
