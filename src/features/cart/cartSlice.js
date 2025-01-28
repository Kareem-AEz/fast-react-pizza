import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // payload = newItem
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      } else {
        cartSlice.caseReducers.removeFromCart(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

// exporting the actions
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// exporting the reducer
export default cartSlice.reducer;

// selector to get the cart items
export const getCartItems = (state) => state.cart.cart;

// memoized selectors
// selector to get the total price of the cart
export const getTotalCartPrice = createSelector([getCartItems], (cart) => {
  return cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
});

// selector to get the number of items in the cart
export const getCartItemsCount = createSelector([getCartItems], (cart) => {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
});

// pizzas added to the cart
export const getCurrentQuantityById = (pizzaId) =>
  createSelector([getCartItems], (cart) => {
    return cart.find((item) => item.id === pizzaId)?.quantity ?? 0;
  });
