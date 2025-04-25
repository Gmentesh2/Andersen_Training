import styles from "./favorite-pokemons.module.css";
const favoritePokemons = [
  {
    name: "Ditto",
    id: 132,
    height: 3,
    weight: 40,
    stats: [
      { name: "hp", value: 48 },
      { name: "attack", value: 48 },
      { name: "defense", value: 48 },
    ],
  },
  {
    name: "Pikachu",
    id: 25,
    height: 4,
    weight: 60,
    stats: [
      { name: "hp", value: 35 },
      { name: "attack", value: 55 },
      { name: "defense", value: 40 },
    ],
  },
  {
    name: "Charizard",
    id: 6,
    height: 17,
    weight: 905,
    stats: [
      { name: "hp", value: 78 },
      { name: "attack", value: 84 },
      { name: "defense", value: 78 },
    ],
  },
];

const FavoritePokemons = () => {
  return (
    <div className={`container ${styles.container}`}>
      <h1>Favorite Pokemons</h1>
      <div className={styles.pokemonList}>
        {favoritePokemons.map((pokemon) => (
          <div key={pokemon.id} className={styles.pokemonCard}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt=""
              className={styles.image}
            />
            <h2>{pokemon.name}</h2>
            <p>ID: {pokemon.id}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <h3>Stats:</h3>
            <ul>
              {pokemon.stats.map((stat) => (
                <li key={stat.name}>
                  {stat.name}: {stat.value}
                </li>
              ))}
            </ul>
            <button className={styles.removeButton}>
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePokemons;
