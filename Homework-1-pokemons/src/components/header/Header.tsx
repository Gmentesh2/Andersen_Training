import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Pokemon</h1>
      <ul>
        <li>
          <button>Favorites</button>
        </li>
        <li>
          <button>Comparison </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
