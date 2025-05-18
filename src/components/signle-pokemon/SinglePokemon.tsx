import { useParams } from "react-router-dom";
import PokemonDetails from "../pokemon-details/PokemonDetails";
import styles from "./single-pokemon.module.css";

const pokemonList = [
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
  {
    name: "Bulbasaur",
    id: 1,
    height: 7,
    weight: 69,
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 49 },
      { name: "defense", value: 49 },
    ],
  },
  {
    name: "Squirtle",
    id: 7,
    height: 5,
    weight: 90,
    stats: [
      { name: "hp", value: 44 },
      { name: "attack", value: 48 },
      { name: "defense", value: 65 },
    ],
  },
];

const SinglePokemon = () => {
  const { id } = useParams<{ id: string }>();
  const pokemon = pokemonList.find((p) => p.id.toString() === id);


  if (!pokemon) {
    return (
      <div className={`container ${styles.container}`}>
        <h1>Pokemon not found</h1>
      </div>
    );
  }

  return (
    <div key={pokemon.id} className={styles.singlePokemonCard}>
      <PokemonDetails
        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        name={pokemon.name}
        id={pokemon.id}
        height={pokemon.height}
        weight={pokemon.weight}
        stats={pokemon.stats}
      />
    </div>
  );
};

export default SinglePokemon;
