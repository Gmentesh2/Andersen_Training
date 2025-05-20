import { Link, useSearchParams } from "react-router-dom";
import styles from "./pok-list.module.css";
import { fetchPokemonList } from "../../store/slices/PokemonSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { SpinnerCircularFixed } from "spinners-react";

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const { list, pagination, loading, error } = useAppSelector(
    (state) => state.pokemonList
  );
  // Use React Router's useSearchParams to manage the page query parameter
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") ?? "1";

  useEffect(() => {
    // Calculate the offset based on the current page
    const offset = (parseInt(currentPage, 10) - 1) * pagination.limit;

    // Fetch Pokémon data for the current page
    dispatch(
      fetchPokemonList(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pagination.limit}`
      )
    );
  }, [dispatch, currentPage, pagination.limit]);

  const handlePageChange = (page: number) => {
    // Update the page in the URL
    setSearchParams({ page: page.toString() });
  };

  // Calculate total pages
  const totalPages = Math.ceil(pagination.count / pagination.limit);

  const handleNextPage = () => {
    if (pagination.next) {
      handlePageChange(Number(currentPage) + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.previous) {
      handlePageChange(Number(currentPage) - 1);
    }
  };
  if (loading) {
    return (
      <div className={styles.loading}>
        <SpinnerCircularFixed enabled={true} size={100} color=" #FF6347" />
      </div>
    );
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
                  to={`/pokemon/${pokemon.url
                    .split("/")
                    .filter(Boolean)
                    .pop()}`}
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
