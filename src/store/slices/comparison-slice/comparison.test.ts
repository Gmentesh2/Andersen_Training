
import reducer, {
  addPokemonToComparison,
  clearError,
  fetchComparisonPokemon,
  initialState,
  removePokemon,
  ComparisonPokemonTypes,
  ComparisonPokemonState,
} from "./ComparisonSlice";

const pikachu: ComparisonPokemonTypes = {
  id: 25,
  name: "pikachu",
  image: "url/pikachu.png",
  height: 4,
  weight: 60,
  stats: [{ name: "speed", value: 90 }],
};

const bulbasaur: ComparisonPokemonTypes = {
  id: 1,
  name: "bulbasaur",
  image: "url/bulbasaur.png",
  height: 7,
  weight: 69,
  stats: [{ name: "hp", value: 45 }],
};

describe("ComparisonSlice reducer", () => {
  test("should handle the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  test("should add a pokemon to comparison", () => {
    const state = reducer(initialState, addPokemonToComparison(pikachu));
    expect(state.pokemon).toContainEqual(pikachu);
    expect(state.error).toBeNull();
  });

  test("should set error when adding more than 2 pokemons", () => {
    const fullState: ComparisonPokemonState = {
      ...initialState,
      pokemon: [pikachu, bulbasaur],
    };
    const charizard = { ...pikachu, id: 6, name: "charizard" };
    const state = reducer(fullState, addPokemonToComparison(charizard));
    expect(state.error).toBe("You can only compare 2 Pokémon at a time.");
  });
  test("should remove a pokemon by id", () => {
    const stateWithTwo = {
      ...initialState,
      pokemon: [pikachu, bulbasaur],
    };
    const state = reducer(stateWithTwo, removePokemon(25));
    expect(state.pokemon).toEqual([bulbasaur]);
  });

  test("should clear error", () => {
    const stateWithError = {
      ...initialState,
      error: "Some error",
    };
    const state = reducer(stateWithError, clearError());
    expect(state.error).toBeNull();
  });

  test("should handle fetchComparisonPokemon.pending", () => {
    const action = { type: fetchComparisonPokemon.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  test("should handle fetchComparisonPokemon.fulfilled", () => {
    const mockPokemon: ComparisonPokemonTypes = {
      id: 1,
      name: "bulbasaur",
      image: "url/bulbasaur.png",
      height: 7,
      weight: 69,
      stats: [{ name: "hp", value: 45 }],
    };
    const action = {
      type: fetchComparisonPokemon.fulfilled.type,
      payload: mockPokemon,
    };
    const state = reducer(initialState, action);
    expect(state.pokemon).toContainEqual(mockPokemon);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
  test("should handle fetchComparisonPokemon.rejected", () => {
    const action = {
      type: fetchComparisonPokemon.rejected.type,
      error: { message: "Failed to fetch" },
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed to fetch");
  });
});
