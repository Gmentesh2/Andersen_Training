import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/PokemonSlice";
import singlePokemonReducer from "./slices/SinglePokemonSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    singlePokemon: singlePokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
