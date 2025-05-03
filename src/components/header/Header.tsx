import { Link } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link className={styles.home} to={"/"}>
        Pokemon
      </Link>
      <ul>
        <li>
          <Link to={"/favorites"}>Favorites</Link>
        </li>
        <li>
          <Link to={"/comparison"}>Comparison </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
