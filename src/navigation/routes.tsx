import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import MainLayout from "../layout/MainLayout";
import FavoritesScreen from "../pages/favorites/FavoritesScreen";
import ComparisonScreen from "../pages/comparison/ComparisonScreen";
import SinglePokemonScreen from "../pages/single-pokemon/SinglePokemonScreen";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/comparison" element={<ComparisonScreen />} />
        <Route path="/pokemon/:pokemonID" element={<SinglePokemonScreen />} />
        <Route
          path="*"
          element={
            <div
              style={{
                display: "block",
                margin: "100px auto",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "34px",
              }}
            >
              404 Not Found
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
