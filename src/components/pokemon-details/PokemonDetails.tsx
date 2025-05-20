import styles from "./pokemon-details.module.css";
import { PokemonDetailsTypes } from "../../store/slices/SinglePokemonSlice";

const PokemonDetails = ({
  image,
  name,
  id,
  height,
  weight,
  stats,
}: PokemonDetailsTypes) => {
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
        </section>
      </div>
    </div>
  );
};

export default PokemonDetails;
