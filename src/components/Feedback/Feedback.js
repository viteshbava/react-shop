import FloatingAlerts from './Alert/FloatingAlerts';
import FullScreenLoader from './FullScreenLoader/FullScreenLoader';
import ModalDisplayHandler from './Modal/ModalDisplayHandler';

const Feedback = () => (
  <>
    <FullScreenLoader />
    <ModalDisplayHandler />
    <FloatingAlerts />
  </>
);

export default Feedback;
