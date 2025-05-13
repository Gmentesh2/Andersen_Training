/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Pokemon = {
  name: string;
  url: string;
};

export type Pagination = {
  page: number;
  limit: number;
  next: string | null;
  previous: string | null;
  count: number;
};
export type PokemonState = {
  list: Pokemon[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
};

const initialState: PokemonState = {
  list: [],
  pagination: {
    page: 1,
    limit: 20,
    next: null,
    previous: null,
    count: 1302,
  },
  loading: false,
  error: null,
};

// Async thunk for fetching Pokemon data
export const fetchPokemonList = createAsyncThunk(
  "fetchPokemonList",
  async (url: string = "https://pokeapi.co/api/v2/pokemon") => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon data");
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return e instanceof Error ? e.message : "An unknown error occurred";
    }
  }
);

const pokemonSlice = createSlice({
  name: "getPokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemonList.fulfilled,
        (
          state,
          action: PayloadAction<{
            results: Pokemon[];
            next: string | null;
            previous: string | null;
          }>
        ) => {
          state.loading = false;
          state.list = action.payload.results;
          state.pagination.next = action.payload.next;
          state.pagination.previous = action.payload.previous;

          // Calculate the current page based on the "next" or "previous" URL
          const nextOffset = action.payload.next
            ? new URL(action.payload.next).searchParams.get("offset")
            : null;
          const previousOffset = action.payload.previous
            ? new URL(action.payload.previous).searchParams.get("offset")
            : null;

          if (nextOffset) {
            state.pagination.page = Math.floor(
              Number(nextOffset) / state.pagination.limit
            );
          } else if (previousOffset) {
            state.pagination.page =
              Math.floor(Number(previousOffset) / state.pagination.limit) + 1;
          } else {
            state.pagination.page = 1; // Default to page 1 if no next or previous URL
          }
        }
      )
      .addCase(
        fetchPokemonList.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default pokemonSlice.reducer;
