import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PokemonDetails = {
  name: string;
  id: number;
  height: number;
  weight: number;
  stats: PokemonStats[];
};
export type PokemonStats = {
  name: string;
  value: number;
};
export type SinglePokemonState = {
  pokemon: PokemonDetails | null;
  loading: boolean;
  error: string | null;
};
const initialState: SinglePokemonState = {
  pokemon: null,
  loading: false,
  error: null,
};

// Async thunk for fetching Pokemon data
export const fetchSinglePokemon = createAsyncThunk(
  "fetchSinglePokemon",
  async (id: number) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon data");
      }
      const data = await response.json();
      type ApiStat = {
        base_stat: number;
        stat: {
          name: string;
        };
      };
      const stats = data.stats.map((stat: ApiStat) => {
        return {
          name: stat.stat.name,
          value: stat.base_stat,
        };
      });
      return {
        name: data.name,
        id: data.id,
        height: data.height,
        weight: data.weight,
        stats: stats,
      } as PokemonDetails;
    } catch (e) {
      throw e instanceof Error ? e.message : "An unknown error occurred";
    }
  }
);

const SinglePokemonSlice = createSlice({
  name: "getSinglePokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSinglePokemon.fulfilled,
        (state, action: PayloadAction<PokemonDetails>) => {
          state.loading = false;
          state.pokemon = action.payload;
        }
      )
      .addCase(fetchSinglePokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unknown error occurred";
      });
  },
});

export default SinglePokemonSlice.reducer;
