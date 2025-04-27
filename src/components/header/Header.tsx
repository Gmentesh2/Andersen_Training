import { Link } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <a className={styles.home} href="/">Pokemon</a>
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
