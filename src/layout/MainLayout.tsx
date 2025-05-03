import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default MainLayout;
