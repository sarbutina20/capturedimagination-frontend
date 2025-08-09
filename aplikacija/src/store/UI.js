import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "UI",
  initialState: {
    showCart: false,
    auth:false

  },
  reducers: {
    toggleCart(state) {
        state.showCart = !state.showCart
    },
    toggleAuth(state) {
        state.auth = !state.auth
    }
  },
});

export const { toggleCart, toggleAuth } = uiSlice.actions;

export default uiSlice.reducer;