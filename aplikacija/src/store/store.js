import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer';
import UI from './UI';
import favoritesReducer from './favoritesReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    UI: UI,
    favorites: favoritesReducer
  },
});

export default store;