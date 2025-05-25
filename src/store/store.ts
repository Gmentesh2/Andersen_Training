import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/PokemonSlice";
import singlePokemonReducer from "./slices/SinglePokemonSlice";
import favoritePokemonReducer from "./slices/FavoritePokemonSlice";
import comparisonPokemonReducer from "./slices/ComparisonSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

// Combine reducers when using Redux persist.
const rootReducer = combineReducers({
  reducer: {
    pokemonList: pokemonReducer,
    singlePokemon: singlePokemonReducer,
    favoritePokemons: favoritePokemonReducer,
    comparisonPokemons: comparisonPokemonReducer,
  },
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favoritePokemons"],
};
// Create a persisted reducer.

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
