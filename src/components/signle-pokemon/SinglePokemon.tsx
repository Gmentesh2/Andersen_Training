import { useParams } from "react-router-dom";
import PokemonDetails from "../pokemon-details/PokemonDetails";
import styles from "./single-pokemon.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { fetchSinglePokemon } from "../../store/slices/single-pokemon-slice/SinglePokemonSlice";
import { useEffect } from "react";
import { SpinnerCircular } from "spinners-react";

const SinglePokemon = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { pokemon, loading, error } = useAppSelector(
    (state) => state.singlePokemon
  );

  // Fetch the Pokemon data based on the ID from the URL
  useEffect(() => {
    dispatch(fetchSinglePokemon(Number(id)));
  }, [dispatch, id]);

  if (!pokemon) {
    return (
      <div className={`container ${styles.container}`}>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div key={pokemon.id} className={styles.singlePokemonCard}>
      {loading ? (
        <div className={styles.loading}>
          <h1>
            <SpinnerCircular enabled={true} size={100} color=" #FF6347" />
          </h1>
        </div>
      ) : (
        <PokemonDetails
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          name={pokemon.name}
          id={pokemon.id}
          height={pokemon.height}
          weight={pokemon.weight}
          stats={pokemon.stats}
        />
      )}
    </div>
  );
};

export default SinglePokemon;
