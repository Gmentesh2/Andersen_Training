import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: ["Pokemon"],
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      {
        results: { name: string; url: string }[];
        next: string | null;
        previous: string | null;
        count: number;
      },
      { offset?: number; limit?: number }
    >({
      query: ({ offset = 0, limit = 20 }) =>
        `pokemon?offset=${offset}&limit=${limit}`,
    }),
  }),
});

export const { useGetPokemonListQuery } = pokemonApi;