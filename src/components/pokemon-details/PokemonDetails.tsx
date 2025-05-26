import styles from "./pokemon-details.module.css";
import { PokemonDetailsTypes } from "../../store/slices/single-pokemon-slice/SinglePokemonSlice";
import { addPokemonToComparison } from "../../store/slices/ComparisonSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";

const PokemonDetails = ({
  image,
  name,
  id,
  height,
  weight,
  stats,
}: PokemonDetailsTypes) => {
  const dispatch = useAppDispatch();
  const comparison = useAppSelector((state) => state.comparisonPokemons);

  const handleAddToComparison = () => {
    dispatch(
      addPokemonToComparison({ image, name, id, height, weight, stats })
    );
  };

  return (
    <div className={`${styles.pokemonDetails} container`}>
      <div className={styles.pokemonCard}>
        <img className={styles.image} src={image} alt={name} />
        <section className={styles.about}>
          <article className={styles.description}>
            <h2>{name}</h2>
            <p>ID:{id}</p>
          </article>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
          <div className={styles.stats}>
            <h3>STATS:</h3>
            <ul className={styles.statsList}>
              {stats.map((stat) => (
                <li key={stat.name}>
                  {stat.name}: {stat.value}
                </li>
              ))}
            </ul>
          </div>
          <button
            style={{
              color: comparison.pokemon?.some((p) => p.id === id)
                ? "#FFD700"
                : "currentColor",
            }}
            onClick={handleAddToComparison}
            className={styles.comparisonButton}
          >
            Comparison
          </button>
        </section>
      </div>
    </div>
  );
};

export default PokemonDetails;
