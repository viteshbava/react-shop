import { useSelector } from 'react-redux';
import styles from './FullScreenLoader.module.css';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import Spinner from '../../UI/Spinner/Spinner';
import useAnimate from '../../../hooks/use-animate';

const FullScreenLoader = () => {
  console.log('Start of Parent');
  const isLoading = useSelector((state) => state.ui.loading);
  console.log('isLoading: ', isLoading);
  const { shouldRender, isEntering, isExiting } = useAnimate({
    isMounted: isLoading,
    enterTime: 200,
    exitTime: 200,
  });

  console.log('shouldRender: ', shouldRender);
  console.log('isEntering: ', isEntering);
  console.log('isExiting: ', isExiting);

  if (!shouldRender) {
    console.log('End of Parent: rending rull...');
    return null;
  }

  console.log('End of Parent');
  return (
    <FullScreenOverlay entering={isEntering} exiting={isExiting}>
      <Spinner className={styles.main} width="7rem" thickness="1rem" />
    </FullScreenOverlay>
  );
};

export default FullScreenLoader;
