import { useContext } from 'react';

import { useSelector } from 'react-redux';
import ModalContext from '../../context/modal-context';

import FloatingAlerts from './Alert/FloatingAlerts';
import FullScreenLoader from './FullScreenLoader/FullScreenLoader';
import Modal from './Modal/Modal';

const Feedback = () => {
  const isLoading = useSelector((state) => state.ui.loading);
  const { alerts } = useSelector((state) => state.ui.alerts);

  const modal = useContext(ModalContext);
  return (
    <>
      {modal.show && modal.props && <Modal modal={modal.props} />}
      {isLoading && <FullScreenLoader />}
      <FloatingAlerts alerts={alerts} />
    </>
  );
};

export default Feedback;
