import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './FullScreenLoader.module.css';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import Spinner from '../../UI/Spinner/Spinner';
import useAnimateEnter from '../../../hooks/use-animateEnter';
import useAnimateExit from '../../../hooks/use-animateExit';

const FullScreenLoader = () => {
  const isLoading = useSelector((state) => state.ui.loading);

  return (
    <FullScreenOverlay show={isLoading}>
      <Spinner className={styles.main} width="7rem" thickness="1rem" />
    </FullScreenOverlay>
  );
};

export default FullScreenLoader;
