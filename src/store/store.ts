import { combineReducers, configureStore } from "@reduxjs/toolkit";
import singlePokemonReducer from "./slices/single-pokemon-slice/SinglePokemonSlice";
import favoritePokemonReducer from "./slices/FavoritePokemonSlice";
import comparisonPokemonReducer from "./slices/ComparisonSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { pokemonApi } from "./api/pokemonApi";

// Combine reducers when using Redux persist.
const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  singlePokemon: singlePokemonReducer,
  favoritePokemons: favoritePokemonReducer,
  comparisonPokemons: comparisonPokemonReducer,
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
