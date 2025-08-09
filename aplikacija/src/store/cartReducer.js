import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    stavke: [],
    ukupnaCijenaStavki: 0,
    ukupnaKolicina: 0
  },
  reducers: {
    postavljanjeStanja: (state, action) => {
      const kosarica = action.payload;
      state.stavke = kosarica.stavke;
      state.ukupnaCijenaStavki = kosarica.ukupnaCijenaStavki;
      state.ukupnaKolicina = kosarica.ukupnaKolicina;
    },

    brisanjeStanja: (state) => {
      state.stavke = [];
      state.ukupnaCijenaStavki = 0;
      state.ukupnaKolicina = 0;
    },

    addToCart: (state, action) => {
      const novaKnjiga = action.payload;
      const postojecaKnjiga = state.stavke.find(
        (knjiga) => knjiga.isbn === novaKnjiga.isbn
      );
      state.ukupnaCijenaStavki += novaKnjiga.cijena;
      state.ukupnaKolicina++;

      if (!postojecaKnjiga) {
        state.stavke.push({
          isbn: novaKnjiga.isbn,
          autor: novaKnjiga.autor,
          naslov: novaKnjiga.naslov,
          opis: novaKnjiga.opis,
          cijena: novaKnjiga.cijena,
          ukupnaCijena: novaKnjiga.cijena,
          kolicina: 1,
        });
      } else {
        postojecaKnjiga.ukupnaCijena += novaKnjiga.cijena;
        postojecaKnjiga.kolicina++;
      }
    },

    removeFromCart: (state, action) => {
      const isbn = action.payload.isbn;
      const postojecaKnjiga = state.stavke.find(
        (knjiga) => knjiga.isbn === isbn
      );

      state.ukupnaCijenaStavki =
        state.ukupnaCijenaStavki - postojecaKnjiga.cijena;
      state.ukupnaKolicina--;
      
      if (postojecaKnjiga.kolicina === 1) {
        state.stavke = state.stavke.filter((knjiga) => knjiga.isbn !== isbn);
      } else {
        postojecaKnjiga.kolicina--;
        postojecaKnjiga.ukupnaCijena =
          postojecaKnjiga.ukupnaCijena - postojecaKnjiga.cijena;
      }
    },
  },
});

export const { addToCart, removeFromCart, postavljanjeStanja, brisanjeStanja } =
  cartSlice.actions;

export default cartSlice.reducer;
