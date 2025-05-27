import reducer, {
  fetchSinglePokemon,
  initialState,
  PokemonDetailsTypes,
} from "./SinglePokemonSlice";


describe("SinglePokemonSlice reducer", () => {
  test("should handle the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  test("should handle fetchSinglePokemon.pending", () => {
    const action = { type: fetchSinglePokemon.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      pokemon: null,
      loading: true,
      error: null,
    });
  });

  test("should handle fetchSinglePokemon.fulfilled", () => {
    const mockPokemon: PokemonDetailsTypes = {
      id: 1,
      name: "bulbasaur",
      image: "",
      height: 7,
      weight: 69,
      stats: [{ name: "hp", value: 45 }],
    };

    const action = {
      type: fetchSinglePokemon.fulfilled.type,
      payload: mockPokemon,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      pokemon: mockPokemon,
      loading: false,
      error: null,
    });
  });

  test("should handle fetchSinglePokemon.rejected", () => {
    const action = {
      type: fetchSinglePokemon.rejected.type,
      error: { message: "Failed to fetch" },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      pokemon: null,
      loading: false,
      error: "Failed to fetch",
    });
  });
});
