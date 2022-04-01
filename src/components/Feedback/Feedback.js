import { useContext } from 'react';

import { useSelector } from 'react-redux';
import ModalContext from '../../context/modal-context';

import FloatingAlerts from './Alert/FloatingAlerts';
import FullScreenLoader from './FullScreenLoader/FullScreenLoader';
import Modal from './Modal/Modal';

const Feedback = () => {
  const { alerts } = useSelector((state) => state.ui.alerts);
  const modal = useContext(ModalContext);

  console.log('Rendering Feedback...');

  return (
    <>
      <FullScreenLoader />
      {modal.show && modal.props && <Modal modal={modal.props} />}
      {/* {alerts.length > 0 && <FloatingAlerts alerts={alerts} />} */}
    </>
  );
};

export default Feedback;
