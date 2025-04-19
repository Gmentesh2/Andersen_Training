import styles from "./pokemon-details.module.css";
type PokemonDetailsProps = {
  image: string;
  name: string;
  id: number;
  height: number;
  weight: number;
  stats: {
    name: string;
    value: number;
  }[];
};

const PokemonDetails = ({
  image,
  name,
  id,
  height,
  weight,
  stats,
}: PokemonDetailsProps) => {
  return (
    <div className={styles.pokemonDetails}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>ID: {id}</p>
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
    </div>
  );
};

export default PokemonDetails;
