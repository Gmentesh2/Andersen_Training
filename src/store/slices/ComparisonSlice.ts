import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ComparisonPokemonTypes = {
  image: string;
  name: string;
  id: number;
  height: number;
  weight: number;
  stats: ComparisonPokemonStats[];
};
export type ComparisonPokemonStats = {
  name: string;
  value: number;
};
export type ComparisonPokemonState = {
  pokemon: ComparisonPokemonTypes[] | null;
  loading: boolean;
  error: string | null;
  limit: number;
};
const initialState: ComparisonPokemonState = {
  pokemon: [],
  loading: false,
  error: null,
  limit: 2,
};
// Async thunk for fetching Pokemon data
export const fetchComparisonPokemon = createAsyncThunk(
  "fetchComparisonPokemon",
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
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        name: data.name,
        id: data.id,
        height: data.height,
        weight: data.weight,
        stats: stats,
      } as ComparisonPokemonTypes;
    } catch (e) {
      throw e instanceof Error ? e.message : "An unknown error occurred";
    }
  }
);

const comparisonPokemonSlice = createSlice({
  name: "comparisonPokemon",
  initialState,
  reducers: {
    removePokemon: (state, action: PayloadAction<number>) => {
      if (state.pokemon) {
        state.pokemon = state.pokemon.filter(
          (pokemon) => pokemon.id !== action.payload
        );
      }
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComparisonPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchComparisonPokemon.fulfilled,
        (state, action: PayloadAction<ComparisonPokemonTypes>) => {
          state.loading = false;
          if (state.pokemon && state.pokemon.length >= state.limit) {
            state.error = "You can only compare 2 Pokémon at a time.";
          } else if (
            state.pokemon &&
            !state.pokemon.some((p) => p.id === action.payload.id)
          ) {
            state.pokemon.push(action.payload);
          }
        }
      )
      .addCase(fetchComparisonPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unknown error occurred";
      });
  },
});

export const { removePokemon, clearError } = comparisonPokemonSlice.actions;
export default comparisonPokemonSlice.reducer;
