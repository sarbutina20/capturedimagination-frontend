import { createSlice } from "@reduxjs/toolkit";


const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    postavljanjeFavorita: (state, action) => {
      state.favorites = action.payload;
    },
    brisanjeSvihFavorita: (state) => {
      state.favorites = [];
    },
  },
});

export const { postavljanjeFavorita, brisanjeSvihFavorita } = favoritesSlice.actions;

export default favoritesSlice.reducer;


/*
PRETHODNI PRISTUP S LOKALNOM POHRANOM

const favoritesFromLocalStorage = localStorage.getItem("favorites")

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: favoritesFromLocalStorage ? JSON.parse(favoritesFromLocalStorage) : [],
  },
  reducers: {
    dodavanjeFavorita: (state, action) => {
        const postojeciFavorit = state.favorites.find((favKnjiga) => favKnjiga === action.payload);
        if (!postojeciFavorit) {
            state.favorites.push(action.payload);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
          }
    },
    brisanjeFavorita: (state, action) => {
        state.favorites = state.favorites.filter((isbn) => isbn !== action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});*/