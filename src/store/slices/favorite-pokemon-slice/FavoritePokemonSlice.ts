import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavoritePokemon = {
  name: string;
  url: string;
};

export type FavoritePokemonState = {
  list: FavoritePokemon[];
  loading: boolean;
  error: string | null;
};

export const initialState: FavoritePokemonState = {
  list: [],
  loading: false,
  error: null,
};

const favoritePokemonSlice = createSlice({
  name: "favoritePokemon",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoritePokemon>) => {
      // Only add if it's not in favorites list.
      if (!state.list.some((p) => p.name === action.payload.name)) {
        state.list.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      // remove by name
      state.list = state.list.filter((p) => p.name !== action.payload);
    },
  },
});
export const { addToFavorites, removeFromFavorites } =
  favoritePokemonSlice.actions;
export default favoritePokemonSlice.reducer;
