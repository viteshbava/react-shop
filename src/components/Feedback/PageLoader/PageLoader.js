import styles from './PageLoader.module.css';
import Spinner from '../../UI/Spinner/Spinner';

const PageLoader = () => (
  <Spinner className={styles.main} width="7rem" thickness="1rem" />
);

export default PageLoader;
