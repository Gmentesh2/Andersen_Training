
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
    <div className={"pokemon-details-card"}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <h3>Stats</h3>
      <ul>
        {stats.map((stat) => (
          <li key={stat.name}>
            {stat.name}: {stat.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
