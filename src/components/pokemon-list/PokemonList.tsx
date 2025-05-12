import { Link } from "react-router-dom";
import styles from "./pok-list.module.css";
import { fetchPokemonList } from "../../store/slices/PokemonSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const { list, pagination, loading, error } = useAppSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    dispatch(
      fetchPokemonList("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
    );
  }, [dispatch]);

  // Calculate total pages
  const totalPages = Math.ceil(pagination.count / pagination.limit);

  const handleNextPage = () => {
    if (pagination.next) {
      dispatch(fetchPokemonList(pagination.next));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.previous) {
      dispatch(fetchPokemonList(pagination.previous));
    }
  };
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.content} container`}>
        <h2>Pokemon List</h2>
        <section className={styles.cards}>
          {list.map((pokemon, index) => {
            // Extract the Pokémon ID from the URL
            const pokemonId = pokemon.url.split("/").filter(Boolean).pop();

            return (
              <div key={index} className={styles.card}>
                <Link
                  className={styles.description}
                  to={`/pokemon/${pokemon.name}`}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    alt={pokemon.name}
                  />
                  <h2>{pokemon.name}</h2>
                </Link>
                <div className={styles.buttonsDiv}>
                  <button className={styles.button}>Add to favorites</button>
                  <button className={styles.button}>Comparison</button>
                </div>
              </div>
            );
          })}
        </section>
        <ul className={styles.pagination}>
          <li>
            <button
              onClick={handlePreviousPage}
              disabled={!pagination.previous}
            >
              Previous page
            </button>
          </li>
          <li>
            {" "}
            Page:{" "}
            <span
              className={`${styles.pageNumber} ${
                pagination.page === 1 ? styles.activePage : ""
              }`}
            >
              {pagination.page}
            </span>{" "}
            of {totalPages}
          </li>
          <li>
            <button onClick={handleNextPage} disabled={!pagination.next}>
              Next page
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PokemonList;
