import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

const Logo = ({ onClick }) => {
  return (
    <Link onClick={onClick} className={styles["logo-link"]} to="/">
      <span className={styles["logo-link__text"]}>React Shop</span>
    </Link>
  );
};

export default Logo;
