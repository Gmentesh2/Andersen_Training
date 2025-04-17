import styles from "./Card.module.css";

const pokemonList = [
  { name: "Ditto", id: 132 },
  { name: "Pikachu", id: 25 },
  { name: "Charizard", id: 6 },
  { name: "Bulbasaur", id: 1 },
  { name: "Squirtle", id: 7 },
];

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.content} container`}>
        <h2>Pokemon List</h2>
        <section className={styles.cards}>
          {pokemonList.map((pokemon) => (
            <div key={pokemon.id} className={styles.card}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                className={styles.image}
              />
              <h3>
                <span>Name:</span> {pokemon.name}
              </h3>
              <p>ID: {pokemon.id}</p>
              <div className={styles.buttons}>
                <button>Toggle favorites</button>
                <button>Toggle comparison</button>
              </div>
            </div>
          ))}
        </section>
        <ul className={styles.pagination}>
          <li>
            <button>Previous page</button>
          </li>
          <li>1</li>
          <li>
            <button>Next page</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
