import { useSelector } from 'react-redux';
import FloatingAlerts from './Alert/FloatingAlerts';
import FullScreenLoader from './FullScreenLoader/FullScreenLoader';
import ModalDisplayHandler from './Modal/ModalDisplayHandler';

const Feedback = () => {
  return (
    <>
      <FullScreenLoader />
      <ModalDisplayHandler />
      <FloatingAlerts />
    </>
  );
};

export default Feedback;
