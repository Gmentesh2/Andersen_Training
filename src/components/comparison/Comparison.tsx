import styles from "./comparison.module.css";
const comparisonData = [
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

const Comparison = () => {
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.comparison}>
        <h1>Comparison</h1>
        <table>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Pokemon</th>
              <th>Height</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((pokemon) => (
              <tr key={pokemon.id}>
                <td className={styles.name}>{pokemon.name}</td>
                <td>{pokemon.height}</td>
                <td>{pokemon.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comparison;
