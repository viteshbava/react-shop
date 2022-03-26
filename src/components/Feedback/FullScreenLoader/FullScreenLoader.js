import styles from './FullScreenLoader.module.css';
import ModalOverlay from '../Modal/ModalOverlay';
import Spinner from '../../UI/Spinner/Spinner';

const FullScreenLoader = () => (
  <ModalOverlay>
    <Spinner className={styles.main} width="7rem" thinkness="1rem" />
  </ModalOverlay>
);

export default FullScreenLoader;
