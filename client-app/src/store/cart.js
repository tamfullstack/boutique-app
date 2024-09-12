import { createSlice } from "@reduxjs/toolkit";
import { getCart, setCart } from "../utils/cart";

const initialState = {
  cart: getCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartAction(state) {
      state.cart = getCart();
    },
  },
});

export const { getCartAction } = cartSlice.actions;

export const addCartAction = (product) => {
  return (dispatch) => {
    const updatedCart = getCart();
    const cartItemIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (cartItemIndex < 0) {
      updatedCart.push(product);
    } else {
      updatedCart[cartItemIndex].quantity += product.quantity;
    }

    setCart(updatedCart);
    dispatch(getCartAction());
  };
};

export const updateCartAction = (productId, incQuantity) => {
  return (dispatch) => {
    const updatedCart = getCart();
    const cartItemIndex = updatedCart.findIndex(
      (item) => item.id === productId
    );

    if (cartItemIndex >= 0) {
      updatedCart[cartItemIndex].quantity += incQuantity;
    }

    setCart(updatedCart);
    dispatch(getCartAction());
  };
};

export const deleteCartAction = (productId) => {
  return (dispatch) => {
    const updatedCart = getCart();
    const cartItemIndex = updatedCart.findIndex(
      (item) => item.id === productId
    );

    if (cartItemIndex >= 0) {
      updatedCart.splice(cartItemIndex, 1);
    }

    setCart(updatedCart);
    dispatch(getCartAction());
  };
};

const cartReducer = cartSlice.reducer;

export default cartReducer;
