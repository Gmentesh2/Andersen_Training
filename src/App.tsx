import Header from "./components/header/Header"
import "./App.css"
// import PokemonList from "./components/pokemon-list/PokemonList"
import FavoritePokemons from "./components/favorite-pokemons-list/FavoritePokemons"

const App = () => {
  return (
    <>
      <Header /> 
      {/* <PokemonList /> */}
      <FavoritePokemons />
    </>
  )
}

export default App
