import { useEffect } from "react";
import "./App.css";
import RoutesConfig from "./navigation/routes";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  return (
    <div className="App">
      <RoutesConfig />
    </div>
  );
};

export default App;
