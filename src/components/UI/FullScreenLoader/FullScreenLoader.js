import styles from "./FullScreenLoader.module.css";
import ModalOverlay from "../Modal/ModalOverlay";
import Spinner from "../Spinner/Spinner";

const FullScreenLoader = () => {
  return (
    <ModalOverlay>
      <Spinner className={styles.main} width={"7rem"} thinkness={"1rem"} />;
    </ModalOverlay>
  );
};

export default FullScreenLoader;
