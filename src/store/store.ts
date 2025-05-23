import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/PokemonSlice";
import singlePokemonReducer from "./slices/SinglePokemonSlice";
import favoritePokemonReducer from "./slices/FavoritePokemonSlice";
import comparisonPokemonReducer from "./slices/ComparisonSlice"

const store = configureStore({
  reducer: {
    pokemonList: pokemonReducer,
    singlePokemon: singlePokemonReducer,
    favoritePokemons: favoritePokemonReducer,
    comparisonPokemons: comparisonPokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
