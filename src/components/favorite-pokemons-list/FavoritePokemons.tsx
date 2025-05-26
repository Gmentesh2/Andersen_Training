import { Link } from "react-router-dom";
import styles from "./favorite-pokemons.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { removeFromFavorites } from "../../store/slices/FavoritePokemonSlice";
import { useEffect, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { RootState } from "../../store/store";
import { motion } from "motion/react";

const FavoritePokemons = () => {

  const dispatch = useAppDispatch();
  const favoritePokemons = useAppSelector(
    (state: RootState) => state.favoritePokemons.list
  );

  // Local loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for 500ms
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (favoritePokemons.length > 0 && loading) {
    return (
      <div className={styles.loading}>
        <SpinnerCircularFixed enabled={true} size={100} color=" #FF6347" />
      </div>
    );
  }

  return (
    <div className={styles.FavoritePokemons}>
      <main className={styles.container}>
        <h1>Favorite Pokemons</h1>
        <div className={styles.pokemonList}>
          {favoritePokemons.length === 0 && (
            <p className={styles.noFavorites}>No favorite pokemons yet!</p>
          )}
          {favoritePokemons.map((pokemon) => {
            // Extract ID from the URL
            const pokemonId = pokemon.url
              ? pokemon.url.split("/").filter(Boolean).pop()
              : "";

            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                key={pokemon.name}
                data-aos="zoom-out"
                className={styles.pokemonCard}
              >
                <Link to={`/pokemon/${pokemonId}`} className={styles.link}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    alt={pokemon.name}
                    className={styles.image}
                  />
                  <h2>{pokemon.name}</h2>
                </Link>
                <button
                  className={styles.removeButton}
                  onClick={() => dispatch(removeFromFavorites(pokemon.name))}
                >
                  Remove from Favorites
                </button>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default FavoritePokemons;
