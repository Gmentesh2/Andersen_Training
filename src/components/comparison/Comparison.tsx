import { SpinnerCircular } from "spinners-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { removePokemon } from "../../store/slices/comparison-slice/ComparisonSlice";
import styles from "./comparison.module.css";
import { RootState } from "../../store/store";

const Comparison = () => {
  const comparison = useAppSelector(
    (state: RootState) => state.comparisonPokemons.pokemon
  );
  const loading = useAppSelector(
    (state: RootState) => state.comparisonPokemons.loading
  );

  const dispatch = useAppDispatch();

  if (!comparison || comparison.length === 0) {
    return (
      <div className={`container ${styles.noPokemon}`}>
        <h1>No Pokemon in comparison, please add Pokemon to compare!</h1>
      </div>
    );
  }
  if (loading) {
    return <SpinnerCircular enabled={true} size={100} color=" #FF6347" />;
  }

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
              <th>HP</th>
              <th>Attack</th>
              <th>Defense</th>
              <th>Special-attack</th>
              <th>Special-defense</th>
              <th>Speed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comparison?.map((pokemon) => {
              // Helper to get stat value by name
              const getStat = (statName: string) =>
                Array.isArray(pokemon.stats)
                  ? pokemon.stats.find((s) => s.name === statName)?.value ?? "-"
                  : "-";
              return (
                <tr className={styles.tableData} key={pokemon.id}>
                  <td className={styles.name}>{pokemon.name}</td>
                  <td>{pokemon.height}</td>
                  <td>{pokemon.weight}</td>
                  <td>{getStat("hp")}</td>
                  <td>{getStat("attack")}</td>
                  <td>{getStat("defense")}</td>
                  <td>{getStat("special-attack")}</td>
                  <td>{getStat("special-defense")}</td>
                  <td>{getStat("speed")}</td>
                  <td>
                    <button
                      className={styles.removeBtn}
                      onClick={() => dispatch(removePokemon(pokemon.id))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comparison;
