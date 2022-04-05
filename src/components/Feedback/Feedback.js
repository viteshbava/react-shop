import { useContext } from 'react';

import { useSelector } from 'react-redux';
import ModalContext from '../../context/modal-context';

import FloatingAlerts from './Alert/FloatingAlerts';
import FullScreenLoader from './FullScreenLoader/FullScreenLoader';
import ModalDisplayHandler from './Modal/ModalDisplayHandler';

const Feedback = () => {
  const { alerts } = useSelector((state) => state.ui.alerts);
  const { show: showModal } = useContext(ModalContext);

  return (
    <>
      <FullScreenLoader />
      <ModalDisplayHandler />
      {alerts.length > 0 && <FloatingAlerts alerts={alerts} />}
    </>
  );
};

export default Feedback;
