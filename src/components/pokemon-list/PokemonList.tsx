import { Link, useSearchParams } from "react-router-dom";
import styles from "./pok-list.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { SpinnerCircularFixed } from "spinners-react";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/slices/FavoritePokemonSlice";
import {
  clearError,
  fetchComparisonPokemon,
} from "../../store/slices/ComparisonSlice";
import { RootState } from "../../store/store";
import { motion } from "motion/react";
import { useGetPokemonListQuery } from "../../store/api/pokemonApi";

const PokemonList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");
  const limit = 20; // Number of Pokémon per page
  const offset = (currentPage - 1) * limit; // Calculate offset based on current page

  const { data, isLoading, isFetching, error } = useGetPokemonListQuery({ offset, limit });

  const totalPages = Math.ceil((data?.count ?? 0) / limit);

  // Page change logic.
  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const hasNext = !!data?.next;
  const hasPrevious = !!data?.previous;

  const handleNextPage = () => {
    if (hasNext) {
      const nextPage = currentPage + 1;
      handlePageChange(nextPage);
    }
  };
  const handlePreviousPage = () => {
    if (hasPrevious) {
      const previousPage = currentPage - 1;
      handlePageChange(previousPage);
    }
  };

  //

  const dispatch = useAppDispatch();

  const favorites = useAppSelector(
    (state: RootState) => state.favoritePokemons.list
  );
  const comparison = useAppSelector(
    (state: RootState) => state.comparisonPokemons
  );

  useEffect(() => {
    if (comparison.error) {
      alert(comparison.error);
      dispatch(clearError());
    }
  }, [comparison.error, dispatch]);

  if (isLoading || isFetching) {
    return (
      <div className={styles.loading}>
        <SpinnerCircularFixed enabled={true} size={100} color=" #FF6347" />
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.error}>
        <h1>Pokemon not found</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.content} container`}>
        <h2>Pokemon List</h2>
        <section className={styles.cards}>
          {data?.results?.map((pokemon, index) => {
            // Extract the Pokémon ID from the URL
            const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
            const isFavorite = favorites.some(
              (fav) => fav.name === pokemon.name
            );

            const handleAddToFavorites = () => {
              if (isFavorite) {
                dispatch(removeFromFavorites(pokemon.name));
              } else {
                dispatch(
                  addToFavorites({ name: pokemon.name, url: pokemon.url })
                );
              }
            };

            const handleAddToComparison = () => {
              dispatch(fetchComparisonPokemon(Number(pokemonId)));
            };

            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                key={index}
                className={styles.card}
                data-aos="zoom-in-up"
              >
                <Link
                  className={styles.description}
                  to={`/pokemon/${pokemonId}`}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    alt={pokemon.name}
                  />
                  <h2>{pokemon.name}</h2>
                </Link>
                <div className={styles.buttonsDiv}>
                  <button
                    onClick={handleAddToFavorites}
                    className={styles.button}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill={isFavorite ? "#FFD700" : "currentColor"}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.748l-6 5.847 1.42 8.305L12 18.896l-7.42 5.004L6 15.595 0 9.748l8.332-1.593z" />
                    </svg>
                  </button>
                  <button
                    onClick={handleAddToComparison}
                    className={styles.button}
                    style={{
                      color: comparison.pokemon?.some(
                        (p) => p.id === Number(pokemonId)
                      )
                        ? "#FFD700"
                        : "#000000",
                      cursor: comparison.pokemon?.some(
                        (p) => p.id === Number(pokemonId)
                      )
                        ? "not-allowed"
                        : "pointer",
                    }}
                  >
                    Comparison
                  </button>
                </div>
              </motion.div>
            );
          })}
        </section>
        <ul className={styles.pagination}>
          <li>
            <button
              onClick={handlePreviousPage}
              disabled={!hasPrevious}
              style={{
                cursor: hasPrevious ? "pointer" : "not-allowed",
              }}
            >
              Previous page
            </button>
          </li>
          <li>
            {" "}
            Page:{" "}
            <span
              className={`${styles.pageNumber} ${
                currentPage === 1 ? styles.activePage : ""
              }`}
            >
              {currentPage}
            </span>{" "}
            of {totalPages}
          </li>
          <li>
            <button onClick={handleNextPage} disabled={!hasNext}>
              Next page
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PokemonList;
