import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import MainLayout from "../layout/MainLayout";
import FavoritesScreen from "../pages/favorites/FavoritesScreen";
import ComparisonScreen from "../pages/comparison/ComparisonScreen";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/comparison" element={<ComparisonScreen />} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
