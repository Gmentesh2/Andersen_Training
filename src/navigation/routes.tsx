import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import MainLayout from "../layout/MainLayout";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
