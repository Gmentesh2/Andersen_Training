import reducer, {
  addToFavorites,
  removeFromFavorites,
  initialState,
  FavoritePokemonState,
  FavoritePokemon,
} from "./FavoritePokemonSlice";

describe("FavoritePokemonSlice reducer", () => {
  const pikachu: FavoritePokemon = { name: "pikachu", url: "url/pikachu" };
  const bulbasaur: FavoritePokemon = {
    name: "bulbasaur",
    url: "url/bulbasaur",
  };

  test("should handle the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  test("should handle addToFavorites", () => {
    const state = reducer(initialState, addToFavorites(pikachu));
    expect(state.list).toContainEqual(pikachu);
  })

   test("should remove a pokemon from favorites", () => {
    const startState: FavoritePokemonState = {
      ...initialState,
      list: [pikachu, bulbasaur],
    };
    const state = reducer(startState, removeFromFavorites("pikachu"));
    expect(state.list).toEqual([bulbasaur]);
  });

});
