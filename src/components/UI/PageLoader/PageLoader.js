import styles from "./PageLoader.module.css";
import Spinner from "../Spinner/Spinner";

const PageLoader = () => {
  return <Spinner className={styles.main} width={"7rem"} thinkness={"1rem"} />;
};

export default PageLoader;
